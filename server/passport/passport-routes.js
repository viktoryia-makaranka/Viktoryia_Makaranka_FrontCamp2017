import { Router } from 'express';
import passport from 'passport';
import UserController from '../user/user-controller';
import passportConfig from './passport-config';

const router = Router();

passportConfig(passport);

router.use(passport.initialize());
router.use(passport.session());

router.route('/signup')
  .get((req, res) => res.render('signup'))
  .post((req, res, next) => {
    UserController.authentificate({ req, res, next, passport, strategy: 'local-signup', view: 'signup' });
  });

router.route('/login')
  .get((req, res) => res.render('login'))
  .post((req, res, next) => {
    UserController.authentificate({ req, res, next, passport, strategy:'local-login', view: 'login' });
  });

router.route('/logout').get((req, res) => {
  req.logout();
  req.session.destroy();
  return res.redirect('/login');
});

export default router;