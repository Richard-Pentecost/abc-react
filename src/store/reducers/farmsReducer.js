import * as actionTypes from '../actions/actionTypes';

const initialState = {
  farms: [],
  error: false,
};

const fetchFarms = (state, action) => {
  return {
    ...state,
    farms: action.payload,
    error: false,
  };
};

const fetchFarmsFailed = (state) => {
  return { 
    ...state,
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
    case actionTypes.FETCH_FARMS: return fetchFarms(state, action);
    case actionTypes.FETCH_FARMS_FAILED: return fetchFarmsFailed(state);
    case actionTypes.ADD_FARM_FAIL: return addFarmFail(state);
    default: return state;
  };
};

export default reducer;
