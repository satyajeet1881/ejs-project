import { ObjectId } from 'mongodb'

export interface Password {
  _id: ObjectId
  userId: ObjectId
  password: string
}
export interface Users {
  _id: ObjectId
  email: string
  name: string
}

export interface Lottery {
  _id: ObjectId
  lotteryName: string
  code: string
  publishDate: Date
  isDeleted?: boolean
}

export interface LotteryName {
  name: string
}

export interface IUserDocument extends Users, Document {}
export interface IPasswordDocument extends Password, Document {}
export interface ILotteryDocument extends Lottery, Document {}
