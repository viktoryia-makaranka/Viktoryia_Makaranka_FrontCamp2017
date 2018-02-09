import Controller from '../common/controller';
import Facade from './user-facade';

class UserController extends Controller {
  authentificate({ req, res, next, passport, strategy, view }) {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.render(view, {errMsg: info.errMsg});
      }
      req.logIn(user, function (err) {
        if (err) return next(err);
        return res.redirect('/blogs');
      });
    })(req, res, next);
  }
}

export default new UserController(Facade);
