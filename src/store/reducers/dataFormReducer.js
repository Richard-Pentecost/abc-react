import {
  DATA_INPUT_CHANGE,
  CLEAR_DATA_FORM,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  date: new Date(),
  product: '',
  quantity: '',
  meterReading: '',
  initialFloat: '',
  waterUsage: '',
  pumpDial: '',
  float: '',
  reading: '',
  comments: '',
}

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case DATA_INPUT_CHANGE:
      const { prop, value } = action.payload;
      return { ...state, [prop]: value };
    case CLEAR_DATA_FORM:
      return INITIAL_STATE;
    default: return state;
  };
};

export default reducer;
