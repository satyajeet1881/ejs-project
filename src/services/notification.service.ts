
import { isNil } from 'lodash'
import { env } from '../config'
import { TokenRepository } from '../database/repository'
import { EmailRequest, EmailTemplatedRequest, PasswordMailRequest } from '../typings'
import { generateRandomOTP } from '../utils'
import { EmailService } from './aws/aws.email.service'
import { EmailTemplatedService } from './emailTemplate.service '
import { EncryptionService } from './encryption.service'

export class NotificationService {
  private static instance: NotificationService
  private readonly tokenRepository: TokenRepository
  private readonly emailService: EmailService
  constructor() {
    this.tokenRepository = new TokenRepository()
    this.emailService = new EmailService()
  }

  async setToken(verifyCode: string, verificationKey: string): Promise<void> {
    await this.tokenRepository.updateToken(verificationKey, verifyCode)
  }

  async sendPasswordMail({ email, username, type, adminEmail }: PasswordMailRequest): Promise<void> {
    // const waitMessage = `wait for ${expiry / 1000} secs and try again`
    const otp = generateRandomOTP(env.OTP_LENGTH)

    if (!env.TEST_MODE)
      await this.sendEmailTemplate(EmailTemplatedService.Instance.getTemplatedRequest(type)({ username, otp, email, adminEmail }))
    // eslint-disable-next-line no-console
    else console.log('otp', EncryptionService.Instance.encrypt(otp))

    await this.setToken(otp, email)
  }

  private async sendEmailTemplate({ email, html, subject }: EmailTemplatedRequest): Promise<void> {
    const request: EmailRequest = {
      to: [email],
      subject,
      message: '',
      html
    }
    await this.emailService.sendEmail(request)
  }

  public static get Instance() {
    if (isNil(this.instance))
      this.instance = new this()

    return this.instance
  }
}
