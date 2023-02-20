import { Schema, model } from 'mongoose'

const lotteryNameSchema = new Schema({
  name: { type: String, required: true }
}, { collection: 'LotteryName', versionKey: false })
export const LotteryName = model('LotteryName', lotteryNameSchema)
