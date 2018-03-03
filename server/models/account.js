import mongoose from 'mongoose'
const { Schema } = mongoose

const accountSchema = new Schema({
  email: { type: 'String', required: true },
  password: { type: 'String', required: true },
  firstName: { type: 'String', required: false },
  lastName: { type: 'String', required: false },
  username: { type: 'String', required: false },
  albums: { type: 'String', required: false },
  dateAdded: { type: 'Date', default: Date.now, required: true },
})

export default mongoose.model('Account', accountSchema)
