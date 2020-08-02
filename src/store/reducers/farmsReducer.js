import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  farms: [],
  loading: false,
  error: false,
  errorMessage: '',
  addFarmSuccess: false,
};

const fetchFarmsStart = state => {
  return {
    ...state,
    loading: true,
    error: false,
    errorMessage: '',
  }
}
const fetchFarmsSuccess = (state, action) => {
  return {
    ...state,
    farms: action.payload,
    loading: false,
  };
};

const fetchFarmsFail = (state, action) => {
  return { 
    ...state,
    loading: false,
    error: true,
    errorMessage: action.payload,
  };
};

const addFarmStart = state => {
  return {
    ...state,
    loading: true,
    error: false,
    errorMessage: '',
    addFarmSuccess: false,
  }
};

const addFarmSuccess = state => {
  return {
    ...state,
    addFarmSuccess: true,
  };
};

const addFarmFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: true,
    errorMessage: action.payload,
  };
};

const clearFarmSuccessFlag = state => {
  return {
    ...state,
    addFarmSuccess: false,
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
    case actionTypes.FETCH_FARMS_START: return fetchFarmsStart(state);
    case actionTypes.FETCH_FARMS_SUCCESS: return fetchFarmsSuccess(state, action);
    case actionTypes.FETCH_FARMS_FAIL: return fetchFarmsFail(state, action);
    case actionTypes.ADD_FARM_START: return addFarmStart(state);
    case actionTypes.ADD_FARM_SUCCESS: return addFarmSuccess(state);
    case actionTypes.ADD_FARM_FAIL: return addFarmFail(state, action);
    case actionTypes.CLEAR_FARM_SUCCESS_FLAG: return clearFarmSuccessFlag(state);
    case actionTypes.CLEAR_FARM_ERROR_MESSAGE: return clearErrorMessage(state);
    default: return state;
  };
};

export default reducer;
