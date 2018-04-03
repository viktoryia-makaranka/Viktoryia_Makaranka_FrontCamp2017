import { combineReducers } from 'redux';
import blogsReducer from './blogs/reducer';

const rootReducer = combineReducers({
  blogs: blogsReducer
});
export default rootReducer;