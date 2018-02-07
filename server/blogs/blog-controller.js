import Controller from '../common/controller';
import Facade from './blog-facade';

class BlogController extends Controller {}

export default new BlogController(Facade);
