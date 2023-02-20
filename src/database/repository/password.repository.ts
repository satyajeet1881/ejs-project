
import { ObjectId } from 'mongodb'
import { PasswordService } from '../../services/password.service'
import { DatabaseInitializer } from '../DatabaseInitializer'

export class PasswordRepository {
     private readonly passwordService: PasswordService
     constructor () {
       this.passwordService = new PasswordService()
     }

     async upsertPassword (userId: ObjectId, password: string): Promise<void> {
       const dbInstance = await DatabaseInitializer.getInstance().getConnection()
       const hashedPassword = await this.passwordService.hashPassword(password)
       return dbInstance.Password.updateOne({ userId }, { $set: { password: hashedPassword, userId } }, { upsert: true })
     }
}
