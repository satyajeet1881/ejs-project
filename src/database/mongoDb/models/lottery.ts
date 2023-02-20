import { Schema, model } from 'mongoose'

const lotterySchema = new Schema({
  lotteryName: { type: String, required: true },
  code: { type: String, required: true },
  publishDate: { type: Date },
  isDeleted: { type: Boolean },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'Lottery', versionKey: false })
export const Lottery = model('Lottery', lotterySchema)
