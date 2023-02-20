
import { UserPassword, Users } from '../../typings'
import { DatabaseInitializer } from '../DatabaseInitializer'

export class UserRepository {
  async saveUser (data: Omit<Users, '_id'>): Promise<Users> {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    const result = await dbInstance.Users.create(data)
    return result
  }

  // async upsertToken (phone: string, data: Users) {
  //   const dbInstance = await DatabaseInitializer.getInstance().getConnection()
  //   return dbInstance.Users.upsert({ where: { phone } }, data)
  // }

  async getUser (email: string): Promise<Users> {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    return dbInstance.Users.findOne({ email })
  }

  async getUserWithPassword (email: string): Promise<UserPassword[]> {
    const dbInstance = await DatabaseInitializer.getInstance().getConnection()
    return dbInstance.Users.aggregate([{
      $match: { email }
    },
    {
      $lookup: {
        from: 'Password',
        localField: '_id',
        foreignField: 'userId',
        as: 'password'
      }
    },
    {
      $unwind: {
        path: '$password'
      }
    },
    {
      $project: {
        _id: 1,
        email: 1,
        name: 1,
        password: '$password.password'
      }
    }])
  }
}
