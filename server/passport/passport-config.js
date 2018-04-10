import { Strategy } from 'passport-local'
import crypto from 'crypto'
import UserFacade from '../user/user-facade'
import LocalStrategy from './local-strategy'

export default (passport) => {
  passport.use('local', LocalStrategy)

  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser(async (id, done) => {
    const user = await UserFacade.findById(id)
    if (user) done(null, user)
  })
}

export const generateToken = async (req, res) => {
  if (!req.user) res.status(401).json({ errMsg: 'Incorrect data' })
  req.token = req.user._id.toString() + '.' + crypto.randomBytes(40).toString('hex')
  const updatedUser = await UserFacade.findByIdAndUpdate(req.user._id, { token: req.token }, { upsert: true })
  if (!updatedUser) res.status(401).json({ errMsg: 'Incorrect data' })
  res.status(200).json({ id: req.user._id, token: req.token })
}
