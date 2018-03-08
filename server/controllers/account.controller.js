import Account from '../models/account'
import sanitizeHtml from 'sanitize-html'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const sekrit = 'a39e99e9cne9e8eu7rbcu8w9ee7wwu7265e' // not very secret

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
  bcrypt.hash(req.body.account.password, 10, function(err, hash) {
    const newAccount = new Account(req.body.account)

    // sanitize inputs
    newAccount.firstName = sanitizeHtml(newAccount.firstName)
    newAccount.lastName = sanitizeHtml(newAccount.lastName)
    newAccount.username = sanitizeHtml(newAccount.username)
    newAccount.password = hash

    newAccount.save((err, saved) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({ account: saved })
    })
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

export function editAccount(req, res) {
  if (!req.body.account || !req.body.account.email) {
    res.status(403).end()
    return
  }

  Account.findOne({
    email: req.body.account.email,
  }).exec((err, account) => {
    if (err) {
      res.status(500).send(err)
      return
    }

    let newAccount = req.body.account
    account.firstName = sanitizeHtml(newAccount.firstName)
    account.lastName = sanitizeHtml(newAccount.lastName)
    account.username = sanitizeHtml(newAccount.username)

    account.save((err, saved) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({ account: saved })
    })
  })
}

export function loginAccount(req, res) {
  bcrypt.compare(plainTextPassword, hashFromDB, function(err, res) {
    // res == true

    let payload = {
      email: account.email,
      expires: Math.round((new Date().getTime()/1000)) + 3600 // not using expiration for this project
    }
    jwt.sign(sekrit, payload, (err, token) => {

    })
  })
}
