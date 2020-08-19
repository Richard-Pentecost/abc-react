import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  users: [],
  currentUser: null,
  loading: false,
  error: false,
  errorMessage: '',
  addUserSuccess: false,
  showSpinner: false,
};

const fetchUsersStart = state => {
  return {
    ...state,
    loading: true,
    error: false,
    errorMessage: ''
  };
};

const fetchUsersSuccess = (state, action) => {
  return {
    ...state,
    users: action.payload,
    loading: false,
  };
};

const fetchUsersFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: true,
    errorMessage: action.payload,
  };
};

const fetchCurrentUserStart = state => {
  return {
    ...state,
    loading: true,
    error: false,
    errorMessage: '',
  };
};

const fetchCurrentUserSuccess = (state, action) => {
  return {
    ...state,
    currentUser: action.payload,
    loading: false,
  };
};

const fetchCurrentUserFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: true,
    errorMessage: action.payload,
  };
};

const addUserStart = state => {
  return {
    ...state,
    // loading: true,
    error: false,
    errorMessage: '',
    addUserSuccess: false,
    showSpinner: true,
  }
};

const addUserSuccess = state => {
  return {
    ...state,
    // loading: false,
    addUserSuccess: true,
    showSpinner: false
  };
};

const addUserFail = (state, action) => {
  return {
    ...state,
    // loading: false,
    error: true,
    errorMessage: action.payload,
    showSpinner: false,
  };
}

const clearUserSuccessFlag = state => {
  return {
    ...state,
    addUserSuccess: false,
  }
};

const clearUserErrorMessage = state => {
  return {
    ...state,
    error: false,
    errorMessage: '',
  };
};



const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.FETCH_USERS_START: return fetchUsersStart(state);
    case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);
    case actionTypes.FETCH_CURRENT_USER_START: return fetchCurrentUserStart(state);
    case actionTypes.FETCH_CURRENT_USER_SUCCESS: return fetchCurrentUserSuccess(state, action);
    case actionTypes.FETCH_CURRENT_USER_FAIL: return fetchCurrentUserFail(state, action);
    case actionTypes.ADD_USER_START: return addUserStart(state);
    case actionTypes.ADD_USER_SUCCESS: return addUserSuccess(state, action);
    case actionTypes.ADD_USER_FAIL: return addUserFail(state, action);
    case actionTypes.CLEAR_USER_SUCCESS_FLAG: return clearUserSuccessFlag(state);
    case actionTypes.CLEAR_USER_ERROR_MESSAGE: return clearUserErrorMessage(state);
    default: return state;
  };
};

export default reducer;
