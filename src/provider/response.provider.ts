import { registry } from 'dependencyjs'
import { Request, Response } from 'express'
import { get, isNil } from 'lodash'
import { LoggerService } from '../services/logger.service'
import { AuthenticationStrategy } from '../strategies'
import { AuthenticationStrategyType, ResponseData, UserProfile } from '../typings'
const authenticate = async (request: Request, auth: AuthenticationStrategyType): Promise<UserProfile> => {
  const authService: AuthenticationStrategy = registry.resolve(AuthenticationStrategy, auth)
  return authService.authenticate(request)
}
const getRequestParams = (request: Request): { [key: string]: any } => {
  const swaggerParams = get(get(request, 'swagger', {}), 'params', {}) as {[key: string]: string}
  const params: { [key: string]: any } = {}

  for (const value in swaggerParams)
    if (Object.prototype.hasOwnProperty.call(swaggerParams, value))
      params[value] = get(swaggerParams[value], 'value', null)

  return params
}
export const send = (next: Function, data: ResponseData) => async (request: Request, response: Response) => {
  const log = LoggerService.Instance
  try {
    let userProfile = {}
    request['params'] = getRequestParams(request)
    const { auth = null, async = true } = data
    if (!isNil(auth))
      userProfile = await authenticate(request, auth)

    const result = async ? await next({ request, response, userProfile }) : next({ request, response, userProfile })
    response.status(200).json(result)
  } catch (error: any) {
    log.logger.error('error', error)
    const statusCode = Object.prototype.hasOwnProperty.call(error, 'statusCode') ? error.statusCode : 500
    const message = Object.prototype.hasOwnProperty.call(error, 'statusCode') ? error.error : { message: 'Internal server error' }
    response.status(statusCode).send(message)
  }
}
