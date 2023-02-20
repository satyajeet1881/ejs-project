
import { Lottery } from '../../typings'
import { DatabaseInitializer } from '../DatabaseInitializer'
export class LotteryNameRepository {
  async saveLotteryName(name: string) {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    return dbInstance.LotteryName.updateOne({ name }, { $set: { name } }, { upsert: true })
  }

  async getLotteryName(): Promise<Lottery> {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    return dbInstance.LotteryName.find({})
  }

  async deleteLotteryName(query: any) {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    return dbInstance.LotteryName.remove(query)
  }
}
