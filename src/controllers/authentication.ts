import { send } from '../provider'
import { JWTService, UserService } from '../services'
import { ControllersRequest } from '../typings'

function loginWithEmailPassword ({ userProfile }: ControllersRequest) {
  const jWTService = new JWTService()

  return { _id: userProfile._id, token: jWTService.generateToken(userProfile) }
}
async function resetPassword ({ userProfile, request }: ControllersRequest) {
  const userServices = new UserService()
  return userServices.setUserPassword(userProfile._id, request.body['password'])
}

async function sendResetPasswordLink ({ request }: ControllersRequest) {
  const userServices = new UserService()
  return userServices.sendResetPasswordLink(request.body['email'])
}

module.exports = {
  loginWithEmailPassword: send(loginWithEmailPassword, { auth: 'basicAuth', async: false }),
  resetPassword: send(resetPassword, { auth: 'emailAuth', code: 204 }),
  sendResetPasswordLink: send(sendResetPasswordLink, { code: 204 })
}
