import TokenManager from '../../utils/token-manager';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_START,
  LOGOUT_USER,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  password: '',
  errorMessage: '',
  loading: false,
  token: TokenManager.isTokenValid() ? TokenManager.getTokenPayload() : null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, errorMessage: '' };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, errorMessage: '' };
    case LOGIN_USER_START:
      return { ...state, loading: true, errorMessage: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, token: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, password: '', loading: false, errorMessage: action.payload};
    case LOGOUT_USER:
      return { ...state, token: null }
    default:
      return state;
  };
};

export default reducer;