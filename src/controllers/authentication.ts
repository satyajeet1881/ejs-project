import { send } from '../provider'
import { JWTService } from '../services'
import { ControllersRequest } from '../typings'

function loginWithEmailPassword ({ userProfile }: ControllersRequest) {
  const jWTService = new JWTService()

  return { _id: userProfile._id, token: jWTService.generateToken(userProfile) }
}
module.exports = {
  loginWithEmailPassword: send(loginWithEmailPassword, { auth: 'basicAuth', async: false })
}
