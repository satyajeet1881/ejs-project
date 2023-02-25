import { model, Schema } from 'mongoose'

const tokenSchema = new Schema({
  verificationKey: { type: String, required: true },
  verifyCode: { type: String, required: true }
}, { collection: 'Tokens', versionKey: false })
export const Tokens = model('Tokens', tokenSchema)
