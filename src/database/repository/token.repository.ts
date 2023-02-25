import { Tokens } from '../../typings/model'
import { DatabaseInitializer } from '../DatabaseInitializer'

export class TokenRepository {
  async updateToken (verificationKey: string, verifyCode: string): Promise<void> {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    await dbInstance.Tokens.updateOne({ verificationKey }, { verificationKey, verifyCode }, { upsert: true })
  }

  async getToken(verificationKey: string, verifyCode: string): Promise<Tokens> {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    return dbInstance.Tokens.findOne({ verificationKey, verifyCode })
  }

  async removeToken(verificationKey: string, verifyCode: string): Promise<Tokens> {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    return dbInstance.Tokens.deleteOne({ verificationKey, verifyCode })
  }
}
