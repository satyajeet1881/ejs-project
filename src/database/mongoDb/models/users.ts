import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true }
}, { collection: 'Users', versionKey: false })
export const Users = model('Users', userSchema)
