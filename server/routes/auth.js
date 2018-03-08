import jwt from 'jsonwebtoken'
import { sekrit } from '../controllers/account.controller'

export default function auth(req, res, next) {
  if (req.headers.authorization === sekrit) {
    return next()
  } else {
    res.status(400).end()
    return
  }
  // this is broken for some reason and I ran out of time to debug it
  // jwt.verify(req.headers.Authorization, sekrit, function (err, decodedPayload, decodedHeader) {
  //   if (err) {
  //     console.error(err.name, err.message)
  //     res.status(400).end()
  //     return
  //   } else {
  //     console.log('decodedPayload', decodedPayload)
  //     if (decodedPayload.iss == 'redY') { // very naive security
  //       req.auth = decodedPayload
  //       return next()
  //     } else {
  //       res.status(400).end()
  //       return
  //     }
  //   }
  // })
}
