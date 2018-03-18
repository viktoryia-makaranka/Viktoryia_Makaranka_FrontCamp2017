import { Strategy } from 'passport-local';
import UserFacade from '../user/user-facade';
import SignupStrategy from './signup-strategy';
import LoginStrategy from './login-strategy';

export default (passport) => {
  passport.use('local-signup', SignupStrategy);
  passport.use('local-login', LoginStrategy);

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await UserFacade.findById(id);
    if (user) done(null, user);
  });
}