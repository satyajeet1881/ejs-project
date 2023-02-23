import { Request } from 'express'
import { get, isNil } from 'lodash'
import { TokenRepository } from '../database/repository'
import { EncryptionService } from '../services'
import { UserProfile } from '../typings'
import { unauthorized } from '../utils'
import { AuthenticationStrategy } from './authentication.strategies'

export class EmailAuthenticationStrategy implements AuthenticationStrategy {
    private readonly tokenRepository: TokenRepository
    constructor () {
      this.tokenRepository = new TokenRepository()
      this.tokenRepository = new TokenRepository()
    }

    async authenticate (request: Request): Promise<UserProfile> {
      const credentials = get(request, 'body', {}) as {otp: string; email: string}
      credentials.otp = EncryptionService.Instance.decrypt(credentials.otp, unauthorized('invalid otp'))
      if (isNil(credentials.email) || isNil(credentials.otp))
        throw unauthorized('missing information')

      const token = await this.tokenRepository.getToken(credentials.email, credentials.otp)
      if (isNil(token))
        throw unauthorized('invalid otp')

      await this.tokenRepository.removeToken(credentials.email, credentials.otp)
      return { email: credentials.email, _id: credentials.email, scopes: 'test', name: 'admin' }
    }
}
