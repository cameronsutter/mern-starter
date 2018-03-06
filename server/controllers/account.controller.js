import Account from '../models/account'
import cuid from 'cuid'
import slug from 'limax'
import sanitizeHtml from 'sanitize-html'

/**
 * Get the Account specified
 * @param req
 * @param res
 * @returns void
 */
export function getAccount(req, res) {
  console.log('server fetching account')
  Photo.findOne({
    email: req.body.email,
  }).exec((err, account) => {
    if (err) {
      res.status(500).send(err)
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
    res.json({ photo: saved })
  });
}
