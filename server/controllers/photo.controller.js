import Photo from '../models/photo'
import cuid from 'cuid'
import slug from 'limax'
import sanitizeHtml from 'sanitize-html'

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
    console.log('server response', photos[0].file)
    res.sendFile(photos[0].file.path)
  })
}

/**
 * Save a new Photo
 * @param req
 * @param res
 * @returns the new photo
 */
export function addPhoto(req, res) {
  console.log(req.body)
  console.log(req.file)
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
    res.json({ photo: saved })
  });
}
