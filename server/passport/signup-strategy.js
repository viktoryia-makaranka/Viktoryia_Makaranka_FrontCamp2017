import { Strategy } from 'passport-local';
import UserFacade from '../user/user-facade';

export default new Strategy(async (username, password, done) => {
  try {
    let user = await UserFacade.findOne({ username: username });
    if (user) return done(null, false, { errMsg: 'email already exists' });
    user = await UserFacade.create({ username: username, password: password});
    return done(null, user);
  } catch(err) {
    return done(err);
  }
});