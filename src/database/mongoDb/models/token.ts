import { model, Schema } from 'mongoose'

const tokenSchema = new Schema({
  verificationKey: { type: String, required: true },
  verifyCode: { type: String, required: true }
}, { collection: 'Token', versionKey: false })
export const Token = model('Token', tokenSchema)
