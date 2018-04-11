import Controller from '../common/controller'
import Facade from './user-facade'

class UserController extends Controller {}

export default new UserController(Facade)
