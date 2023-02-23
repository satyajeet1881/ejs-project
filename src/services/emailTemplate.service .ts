import { isNil } from 'lodash'
import { env } from '../config'
import { CreateEmailTemplatedRequest, EmailTemplatedRequest } from '../typings'
import { badRequest } from '../utils'
import { EncryptionService } from './encryption.service'

export class EmailTemplatedService {
    private static instance: EmailTemplatedService
    getTemplatedRequest (type: string): Function {
      switch (type) {
        case 'RESET_PASSWORD': {
          return (data: CreateEmailTemplatedRequest): EmailTemplatedRequest => this.resetPasswordTemplated(data)
        }
        default : {
          throw badRequest('invalid type')
        }
      }
    }

    resetPasswordTemplated ({ username, otp, email }: CreateEmailTemplatedRequest): EmailTemplatedRequest {
      const data = EncryptionService.Instance.encrypt(otp)
      const link = `${env.SERVER_UI_URL}/account/set-password/${data}?email=${email}`
      return {
        email,
        html: `
      <table><tr>
        <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">
            Dear <a href="mailto:${email}" target="_blank">${username}</a>, </p>
            <p>Please click the below button to reset your account password</p>
        </td>
    </tr>

    <tr>
        <td style="height:50px;"></td>
      </tr>
      <tr>
        <td align="center">
          <a href="${link}" class="btn" style="color: #fff; background-color: #52ABE0;
          border-color: #52ABE0; cursor: pointer; text-decoration: none; padding: .375rem 50px; font-weight: 400;"> Reset Password </a>
        </td>
      </tr></table>`,
        subject: 'Reset Password Link'
      }
    }

    public static get Instance () {
      if (isNil(this.instance))
        this.instance = new this()

      return this.instance
    }
}
