import Photo from '../models/photo'
import cuid from 'cuid'
import slug from 'limax'
import sanitizeHtml from 'sanitize-html'
import path from 'path'

var uploads_base = path.join(__dirname, '..', '..', "uploads")
var uploads = path.join(uploads_base, "u")

/**
 * Get all Photos in an Album
 * @param req
 * @param res
 * @returns array of photos
 */
export function getPhotosInAlbum(req, res) {
  Photo.find({
    userID: req.params.id,
    album: req.params.album,
  }).sort('-name').exec((err, photos) => {
    if (err) {
      res.status(500).send(err)
    }
    let list = photos.map(ph => {
      return `http://redy.docker/api/photos/${ph.file.filename}?type=${ph.file.mimetype}`
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

/**
 * Save a new Photo
 * @param req
 * @param res
 * @returns the new photo
 */
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
    res.json({ photo: `http://redy.docker/api/photos/${req.file.filename}?type=${req.file.mimetype}` })
  });
}
