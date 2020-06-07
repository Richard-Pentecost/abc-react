import { combineReducers } from 'redux';
import authReducer from './authReducer';
import farmsReducer from './farmsReducer';
import farmFormReducer from './farmFormReducer';
import dataReducer from './dataReducer';
import dataFormReducer from './dataFormReducer';

export default combineReducers({
  auth: authReducer,
  farms: farmsReducer,
  farmForm: farmFormReducer,
  data: dataReducer,
  dataForm: dataFormReducer,
});
