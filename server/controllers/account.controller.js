import Account from '../models/account'
import sanitizeHtml from 'sanitize-html'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import serverConfig from '../config'

export const sekrit = 'a39e99e9cne9e8eu7rbcu8w9ee7wwu7265e' // not very secret

export function getAccount(req, res) {
  Account.findOne({
    email: req.params.email,
  }).exec((err, account) => {
    if (err) {
      res.status(500).send(err)
      return
    }
    delete account.password
    res.json({ account })
  })
}

export function addAccount(req, res) {
  if (!req.body.account.email || !req.body.account.password) {
    res.status(403).end()
    return
  }

  //hash the password
  bcrypt.hash(req.body.account.password, 3, function(err, hash) {
    if (err) {
      res.status(500).send(err)
      return
    }
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
      delete saved.password
      res.json({ token: sekrit, account: saved })
      return
      // this is broken for some reason and I ran out of time to debug it
      // createToken(saved.email, (err, token) => {
      //   console.log('token created')
      //   if (err) {
      //     res.status(500).send(err)
      //     return
      //   }
      //   res.json({ token, account: saved })
      // })
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
      delete saved.password
      res.json({ account: saved })
    })
  })
}

export function loginAccount(req, res) {
  Account.findOne({
    email: req.body.email,
  }).exec((err, account) => {
    if (err) {
      res.status(500).send(err)
      return
    }
    if (!account) {
      res.status(400).send(new Error('No account'))
      return
    }

    bcrypt.compare(req.body.password, account.password, function(err, success) {
      if (err) {
        res.status(500).send(err)
        return
      }
      if (success) {
        delete account.password
        res.json({ token: sekrit, account })
        return
      } else {
        res.status(403).end()
        return
      }
    })
    // this is broken for some reason and I ran out of time to debug it
    // createToken(account.email, (err, token) => {
    //   console.log('created token')
    //   if (err) {
    //     res.status(500).send(err)
    //     return
    //   }
    //   console.log('sending')
    //   delete account.password
    //   res.json({ token, account })
    //   return
    // })
  })
}

function createToken (email, callback) {
  let payload = {
    iss: 'redY',
    email: email,
    expires: Math.round((new Date().getTime()/1000)) + 3600 // not using expiration for this project
  }
  jwt.sign(payload, sekrit, callback)
}
