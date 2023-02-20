
import { Lottery, QueryFilter } from '../../typings'
import { DatabaseInitializer } from '../DatabaseInitializer'
export class LotteryRepository {
  async saveLottery(data: Omit<Lottery, '_id'>) {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    return dbInstance.Lottery.create(data)
  }

  async getLottery(query: any, filter: QueryFilter): Promise<Lottery> {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    return dbInstance.Lottery.find({ ...query, isDeleted: false }).sort({ publishDate: -1 }).skip(filter.skip).limit(filter.limit)
  }

  async updateLottery(query: any, update: Partial<Lottery>) {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    return dbInstance.Lottery.updateOne(query, { $set: update })
  }

  async deleteLottery(query: any) {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    return dbInstance.Lottery.updateOne(query, { $set: { isDeleted: true } })
  }
}
