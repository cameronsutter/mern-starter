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
    res.json({ photos })
  })
}

/**
 * Save a new Photo
 * @param req
 * @param res
 * @returns void
 */
export function addPhoto(req, res) {
  console.log(req.body)
  console.log(req.params)
  if (!req.body.photo.userID || !req.body.photo.album || !req.body.photo.file) {
    res.status(403).end()
  }

  const newPhoto = new Photo(req.body.photo);

  // sanitize inputs
  newPhoto.name = sanitizeHtml(newPhoto.name)
  newPhoto.album = sanitizeHtml(newPhoto.album)
  newPhoto.caption = sanitizeHtml(newPhoto.caption)

  newPhoto.save((err, saved) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ photo: saved })
  });
}
