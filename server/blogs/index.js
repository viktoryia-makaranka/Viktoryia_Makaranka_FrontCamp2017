import { Router } from 'express';
import BlogController from './blog-controller';

const router = Router();

router.use((req, res, next) => {
  if (req.user) return next();
  return res.redirect('/login');
});

router.route('/')
  .get((...args) => BlogController.find(...args))
  .post((...args) => BlogController.insertMany(...args));

router.route('/:id')
  .get((...args) => BlogController.findById(...args))
  .put((...args) => BlogController.findByIdAndUpdate(...args))
  .delete((...args) => BlogController.findByIdAndRemove(...args));

export default router;
