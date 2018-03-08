import Photo from '../models/photo'
import sanitizeHtml from 'sanitize-html'
import path from 'path'
import { API_URL } from '../../client/util/apiCaller'

var uploads_base = path.join(__dirname, '..', '..', "uploads")
var uploads = path.join(uploads_base, "u")

export function getPhotosInAlbum(req, res) {
  Photo.find({
    userID: req.params.id,
    album: req.params.album,
  }).sort('-name').exec((err, photos) => {
    if (err) {
      res.status(500).send(err)
    }
    let list = photos.map(ph => {
      return `${API_URL}/photos/${ph.file.filename}?type=${ph.file.mimetype}`
    })
    res.json(list)
  })
}

export function getPhoto(req, res) {
  let fileName = req.params.fileName
  let type = req.query && req.query.type
  res.type(type)
  res.sendFile(`${uploads}/${fileName}`)
}

export function addPhoto(req, res) {
  if (!req.body.userID || !req.body.album || !req.file) {
    res.status(403).end()
  }

  let attrs = {
    ...req.body,
    file: req.file,
  }

  const newPhoto = new Photo(attrs)

  // sanitize inputs
  newPhoto.name = sanitizeHtml(newPhoto.name)
  newPhoto.album = sanitizeHtml(newPhoto.album)

  newPhoto.save((err, saved) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ photo: `${API_URL}/photos/${req.file.filename}?type=${req.file.mimetype}` })
  });
}
