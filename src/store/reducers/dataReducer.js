import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  errorMessage: '',
  addDataSuccess: false,
};
const fetchDataStart = state => {
  return {
    ...state,
    loading: true,
    error: false,
    errorMessage: '',
  }
}
const fetchDataSuccess = (state, action) => {
  return {
    ...state,
    data: action.payload,
    loading: false,
  };
};

const fetchDataFail = (state, action) => {
  return { 
    ...state,
    loading: false,
    error: true,
    errorMessage: action.payload,
  };
};

const addDataSuccess = state => {
  return {
    ...state,
    error: false,
    errorMessage: '',
    addDataSuccess: true,
  };
};

const addDataFail = (state, action) => {
  return {
    ...state,
    error: true,
    errorMessage: action.payload,
  };
};

const clearDataSuccessFlag = state => {
  return {
    ...state,
    addDataSuccess: false,
  }
}

const clearErrorMessage = state => {
  return {
    ...state,
    error: false,
    errorMessage: '',
  };
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.FETCH_DATA_START: return fetchDataStart(state);
    case actionTypes.FETCH_DATA_SUCCESS: return fetchDataSuccess(state, action);
    case actionTypes.FETCH_DATA_FAIL: return fetchDataFail(state, action);
    case actionTypes.ADD_DATA_SUCCESS: return addDataSuccess(state);
    case actionTypes.ADD_DATA_FAIL: return addDataFail(state, action);
    case actionTypes.CLEAR_DATA_SUCCESS_FLAG: return clearDataSuccessFlag(state);
    case actionTypes.CLEAR_DATA_ERROR_MESSAGE: return clearErrorMessage(state);
    case actionTypes.CLEAR_DATA_STATE: return INITIAL_STATE;
    default: return state;
  };
};

export default reducer;
