import { isNil, omit } from 'lodash'
import { UserRepository } from '../database/repository'
import { UserCredentials, UserProfile } from '../typings'
import { unauthorized } from '../utils'
import { PasswordService } from './password.service'
export class UserService {
   private static instance: UserService
   private readonly userRepository: UserRepository
   private readonly passwordService: PasswordService
   constructor () {
     this.userRepository = new UserRepository()
     this.passwordService = new PasswordService()
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

   public static get Instance () {
     if (isNil(this.instance))
       this.instance = new this()

     return this.instance
   }
}
