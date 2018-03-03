import Account from './models/account'
import Album from './models/account'

export default function () {
  Account.count().exec((err, count) => {
    if (count > 0) {
      return
    }

    const account1 = new Account({
      email: 'c@s.com',
      password: 'raphael',
      firstName: 'Cameron',
      lastName: 'Sutter',
      username: 'sparrowhawk',
      albums: 'Sandy Townhome|Orem House|Dream Home',
    })

    Account.create([account1], (error) => {
      // do nothing
    })
  })
}
