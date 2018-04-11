import { Router } from 'express'
import BlogController from './blog-controller'
import UserFacade from '../user/user-facade'
import httpStatus from 'http-status'

const router = Router()

router.use(async (req, res, next) => {
  try {
    const user = await UserFacade.findById(req.query.userId)
    if (!user || (req.query.token !== user.token)) {
      res.status(httpStatus.FORBIDDEN).json({ user : user, urlToken: req.query.token })
    }
    return next()
  } catch (err) {
    next(err)
  }
})

router.route('/')
  .get((...args) => BlogController.find(...args))
  .post((...args) => BlogController.insertMany(...args))

router.route('/:id')
  .get((...args) => BlogController.findById(...args))
  .put((...args) => BlogController.findByIdAndUpdate(...args))
  .delete((...args) => BlogController.findByIdAndRemove(...args))

export default router
