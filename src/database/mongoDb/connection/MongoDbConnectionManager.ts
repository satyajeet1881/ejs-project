import { connect } from 'mongoose'
import { MongoCollection } from '../../../typings'
import { env } from '../../../config'
import { DbConnectionManager } from '../../base/connection/DbConnectionManager'
import { Users, Password, Lottery, LotteryName, Tokens } from '../models'

export class MongoConnectionManager extends DbConnectionManager {
  private static instance: MongoCollection

  getConnection = async () => {
    // eslint-disable-next-line @typescript-eslint/tslint/config
    if (MongoConnectionManager.instance === null || MongoConnectionManager.instance === undefined)
      MongoConnectionManager.instance = await this.getInstance()

    return MongoConnectionManager.instance
  }

  getInstance = async (): Promise<MongoCollection> => {
    await connect(env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    return {
      Users, Password, Lottery, LotteryName, Tokens
    } as any
  }
}
