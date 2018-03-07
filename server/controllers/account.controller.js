import Account from '../models/account'
import cuid from 'cuid'
import slug from 'limax'
import sanitizeHtml from 'sanitize-html'

/**
 * Get the Account specified
 * @param req
 * @param res
 * @returns an account
 */
export function getAccount(req, res) {
  Account.findOne({
    email: req.params.email,
  }).exec((err, account) => {
    if (err) {
      res.status(500).send(err)
      return
    }
    res.json({ account })
  })
}

/**
 * Save a new Account
 * @param req
 * @param res
 * @returns void
 */
export function addAccount(req, res) {
  if (!req.body.account.email || !req.body.account.password) {
    res.status(403).end()
    return
  }

  //hash the password

  const newAccount = new Account(req.body.account)

  // sanitize inputs
  newAccount.firstName = sanitizeHtml(newAccount.firstName)
  newAccount.lastName = sanitizeHtml(newAccount.lastName)
  newAccount.username = sanitizeHtml(newAccount.username)

  newAccount.save((err, saved) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ account: saved })
  })
}

export function addAlbum(req, res) {
  if (!req.body.email || !req.body.album) {
    res.status(403).end()
    return
  }

  Account.findOne({
    email: req.body.email,
  }).exec((err, account) => {
    if (err) {
      res.status(500).send(err)
      return
    }

    let newAlbum = sanitizeHtml(req.body.album)
    let albums = account.albums
    let newAlbums = `${albums}|${newAlbum}`
    account.albums = newAlbums

    account.save((err, saved) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({ albums: newAlbums })
    })
  })
}
