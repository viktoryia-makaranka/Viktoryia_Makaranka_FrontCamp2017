import { Strategy } from 'passport-local'
import UserFacade from '../user/user-facade'

export default new Strategy(async (username, password, done) => {
  try {
    const user = await UserFacade.findOne({ username: username })
    if (!user) {
      return done(null, false, { errMsg: 'Incorrect username' })
    }
    if (user.password !== password) {
      return done(null, false, { errMsg: 'Incorrect password' })
    }
    return done(null, user)
  } catch(err) {
    return done(err)
  }
})
