import { combineReducers } from 'redux'
import blogsReducer from './blogs/reducer'
import authReducer from './auth/reducer'

const rootReducer = combineReducers({
  blogs: blogsReducer,
  auth: authReducer
});
export default rootReducer;