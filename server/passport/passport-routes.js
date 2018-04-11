import { Router } from 'express'
import passport from 'passport'
import httpStatus from 'http-status'
import UserFacade from '../user/user-facade'

import passportConfig, { generateToken } from './passport-config'
const router = Router()

router.use(passport.initialize())

passportConfig(passport)

router.route('/signup')
  .post(async (req, res, next) => {
    const user = await UserFacade.findOne({ username: req.body.username })
    if (user) return res.send({ status: httpStatus.ALREADY_REPORTED,  errMsg : 'username already exists' })
    const newUser = await UserFacade.create({ username: req.body.username, password: req.body.password})
    if (!newUser) res.status(httpStatus.NOT_MODIFIED).json({ errMsg: 'User wasn\'t created' })
    next()
  }, passport.authenticate('local', { session: false }), generateToken)

router.route('/token')
  .post(passport.authenticate('local', { session: false }), generateToken)

export default router