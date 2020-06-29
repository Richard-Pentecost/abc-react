import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.FETCH_DATA_START:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case actionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case actionTypes.FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
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
