import * as actionTypes from '../actions/actionTypes';

const initialState = {
  farms: [],
  loading: false,
  error: false,
};

const fetchFarmsStart = (state) => {
  return {
    ...state,
    loading: true,
    error: false,
  }
}
const fetchFarmsSuccess = (state, action) => {
  return {
    ...state,
    farms: action.payload,
    loading: false,
    error: false,
  };
};

const fetchFarmsFailed = (state) => {
  return { 
    ...state,
    loading: false,
    error: true,
  };
};

const addFarmFail = (state) => {
  return {
    ...state,
    error: true,
  };
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_FARMS_START: return fetchFarmsStart(state);
    case actionTypes.FETCH_FARMS_SUCCESS: return fetchFarmsSuccess(state, action);
    case actionTypes.FETCH_FARMS_FAILED: return fetchFarmsFailed(state);
    case actionTypes.ADD_FARM_FAIL: return addFarmFail(state);
    default: return state;
  };
};

export default reducer;
