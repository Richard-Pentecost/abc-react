import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  users: [],
  currentUser: null,
  loading: false,
  error: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: false,
      };
    case actionTypes.FETCH_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
      case actionTypes.FETCH_CURRENT_USER_START:
        return {
          ...state,
          loading: true,
          error: false,
        }
      case actionTypes.FETCH_CURRENT_USER_SUCCESS:
        return {
          ...state,
          currentUser: action.payload,
          loading: false,
          error: false,
        };
      case actionTypes.FETCH_CURRENT_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: true,
        };
    case actionTypes.ADD_USER_FAIL:
      return {
        ...state,
        error: true,
      };
    case actionTypes.CLEAR_USER_STATE:
      return INITIAL_STATE;
    default: 
      return state;
  };
};

export default reducer;
