import {
  DATA_INPUT_CHANGE,
  CLEAR_DATA_FORM,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  date: new Date(),
  acidData: {
    product: 'Acid1',
    quantity: '1',
    meterReading: '1',
    initialFloat: '1',
    pumpDial: '1',
    float: '1',
    reading: '1',
    comments: 'Acid Comments',
  },
  chlorineData: {
    product: 'chlorine',
    quantity: '2',
    meterReading: '2',
    initialFloat: '2',
    pumpDial: '2',
    float: '2',
    reading: '2',
    comments: 'Chlorine Comments',
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case DATA_INPUT_CHANGE:
      const { prop, value } = action.payload;
      const index = prop.indexOf('-');
      const dataObjStr = prop.substr(0, index) + 'Data';
      const dataObj = { ...state[dataObjStr] };
      const targetStr = prop.substr(index + 1);
      dataObj[targetStr] = value;

      return { ...state, [dataObjStr]: dataObj };
    case CLEAR_DATA_FORM:
      return INITIAL_STATE;
    default: return state;
  };
};

export default reducer;
