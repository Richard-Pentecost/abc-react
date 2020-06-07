import axios from 'axios';
import TokenManager from '../../utils/token-manager';
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
} from './actionTypes';

const URL ='http://localhost:3000/login';

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

const loginUserSuccess = user => {
  return { 
    type: LOGIN_USER_SUCCESS,
    payload: user
  };
};

const loginUserFail = error => {
  return {
    type: LOGIN_USER_FAIL,
    payload: error,
  };
};

export const logoutUser = () => {
  TokenManager.removeToken();
  return { type: LOGOUT_USER }
}

export const loginUser = ({ email, password }, history) => {
  return async dispatch => {
    if (!email || !password) {
      dispatch(loginUserFail('Email and password required'));
    } else {
      dispatch({ type: LOGIN_USER });
      try {
        const response = await axios.post(URL, { email, password });
        TokenManager.setToken(response.data.token);
        const user = TokenManager.getTokenPayload();
        dispatch(loginUserSuccess(user));
        history.push('/home');
      } catch (error) {
        console.log('Error');
        dispatch(loginUserFail(error.response.data.error));
      };
    }
  };
};
