import Facade from '../common/facade';
import User from './user-model';

class UserFacade extends Facade {}

export default new UserFacade(User);
