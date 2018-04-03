import { combineReducers } from 'redux';
import blogsReducer from './blogs/blogsReducer';

const rootReducer = combineReducers({
  blogs: blogsReducer
});
export default rootReducer;