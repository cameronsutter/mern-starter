import path from 'path'
import mongoose from 'mongoose'
import { filePlugin, make_upload_to_model } from 'mongoose-file'
const { Schema } = mongoose

var uploads_base = path.join(__dirname, "uploads")
var uploads = path.join(uploads_base, "u")

const photoSchema = new Schema({
  userEmail: { type: 'String', required: true },
  album: { type: 'String', required: true },
  name: { type: 'String', required: false },
  caption: { type: 'String', required: false },
  dateAdded: { type: 'Date', default: Date.now, required: true },
})

photoSchema.plugin(filePlugin, {
  upload_to: make_upload_to_model(uploads, 'photos'),
  relative_to: uploads_base,
})

export default mongoose.model('Photo', photoSchema)
