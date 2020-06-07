import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  data: [],
  error: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.FETCH_DATA:
      return {
        ...state,
        data: action.payload,
        error: false,
      };
    case actionTypes.FETCH_DATA_FAIL:
      return {
        ...state,
        error: true,
      };
    case actionTypes.ADD_FARM_FAIL:
      return {
        ...state,
        error: true,
      };
    case actionTypes.CLEAR_STATE:
      return INITIAL_STATE;
    default: 
      return state;
  };
};

export default reducer;
