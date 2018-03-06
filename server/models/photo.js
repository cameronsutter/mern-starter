import mongoose from 'mongoose'
const { Schema } = mongoose

const photoSchema = new Schema({
  userID: { type: 'String', required: true },
  album: { type: 'String', required: true },
  file: { type: 'Object', required: true },
  name: { type: 'String', required: false },
  caption: { type: 'String', required: false },
  dateAdded: { type: 'Date', default: Date.now, required: true },
})

export default mongoose.model('Photo', photoSchema)
