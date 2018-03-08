import jwt from 'jsonwebtoken'
import { sekrit } from '../controllers/account.controller'

export default function auth(req, res, next) {
  jwt.verify(sekrit, req.authentication, function (err, decodedPayload, decodedHeader) {
    if (err) {
      console.error(err.name, err.message)
      res.status(400).end()
      return
    } else {
      return next()
    }
  })
}
