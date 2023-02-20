import { model, Schema } from 'mongoose'

const passwordSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Users' },
  password: { type: String, required: true }
}, { collection: 'Password', versionKey: false })
export const Password = model('Password', passwordSchema)
