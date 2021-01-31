import axios from 'axios';
import TokenManager from '../../utils/token-manager';
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_START,
  LOGOUT_USER,
} from './actionTypes';

const URL ='https://abc-app-api.herokuapp.com/login';

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

export const loginUserStart = () => {
  return {
    type: LOGIN_USER_START,
  }
}

const loginUserSuccess = token => {
  return { 
    type: LOGIN_USER_SUCCESS,
    payload: token,
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

export const loginUser = ({ email, password }) => {
  return async dispatch => {
    if (!email || !password) {
      dispatch(loginUserFail('Email and password required'));
    } else {
      try {
        dispatch(loginUserStart());
        const response = await axios.post(URL, { email, password });
        TokenManager.setToken(response.data.token);
        const token = TokenManager.getTokenPayload();
        dispatch(loginUserSuccess(token));
      } catch (error) {
        const err = error.response.data.error;
        let errorMessage;
        err ? errorMessage = err :
          errorMessage = 'A network error has occured. Please try again'
        dispatch(loginUserFail(errorMessage));
      };
    }
  };
};
