import { isNil, omit } from 'lodash'
import { UserRepository, PasswordRepository } from '../database/repository'
import { UserCredentials, UserProfile } from '../typings'
import { unauthorized } from '../utils'
import { PasswordService } from './password.service'
import { NotificationService } from './notification.service'
import { ObjectId } from 'mongodb'
export class UserService {
   private static instance: UserService
   private readonly userRepository: UserRepository
   private readonly passwordRepository: PasswordRepository
   private readonly passwordService: PasswordService

   private readonly notificationService: NotificationService
   constructor () {
     this.userRepository = new UserRepository()
     this.passwordRepository = new PasswordRepository()
     this.passwordService = new PasswordService()
     this.notificationService = new NotificationService()
   }

   async verifyCredentials (credentials: UserCredentials): Promise<UserProfile> {
     let passwordMatched = false
     const invalidCredentialsError = 'authentication unsuccessful.'
     const email = credentials.email
     const user = await this.userRepository.getUserWithPassword(email)
     if (user.length <= 0) throw unauthorized(invalidCredentialsError)
     passwordMatched = await this.passwordService.comparePassword(credentials.password, user[0].password)
     if (!passwordMatched) throw unauthorized(invalidCredentialsError)
     return { ...omit(user[0], 'password'), scopes: '', _id: user[0]._id.toString() }
   }

   async setUserPassword (userId: string, password: string): Promise<void> {
     await this.passwordRepository.upsertPassword(new ObjectId(userId), password)
   }

   async sendResetPasswordLink (email: string): Promise<void> {
     const user = await this.userRepository.getUser(email)
     if (isNil(user))
       throw unauthorized('your account is not created please aks your admin to register')

     await this.notificationService.sendPasswordMail({ email, username: 'admin', type: 'RESET_PASSWORD' })
   }

   public static get Instance () {
     if (isNil(this.instance))
       this.instance = new this()

     return this.instance
   }
}
