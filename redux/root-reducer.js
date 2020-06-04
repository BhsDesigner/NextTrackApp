import { combineReducers } from 'redux';
import {
  adminReducer,
} from 'react-admin';
import {  connectRouter } from 'connected-react-router';
import userReducer from './user/reducer';

export default (history) => combineReducers({
  admin: adminReducer,
  router: connectRouter(history),
  user: userReducer,
});
