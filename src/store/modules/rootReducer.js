import { combineReducers } from 'redux';
import auth from './auth/reducer';
import register from './register/reducer';

export default combineReducers({
  auth,
  register,
});
