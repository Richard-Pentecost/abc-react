import {
  FARM_INPUT_UPDATE,
  CLEAR_FARM_FORM,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  farmName: '',
  postcode: '',
  contactName: '',
  contactNumber: '',
  deliveryMethod: 'tank',
  // acidFactor: 2.85,
  // chlorineFactor: 2.35,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FARM_INPUT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CLEAR_FARM_FORM:
      return INITIAL_STATE;
    default: return state;
  };
};

export default reducer;