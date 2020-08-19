import {
  DATA_INPUT_CHANGE,
  CLEAR_DATA_FORM,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  date: new Date(),
  acidData: {
    product: '',
    quantity: '',
    meterReading: '',
    initialFloat: '',
    pumpDial: '',
    float: '',
    reading: '',
    comments: '',
  },
  chlorineData: {
    product: 'Chlorine',
    quantity: '',
    meterReading: '',
    initialFloat: '',
    pumpDial: '',
    float: '',
    reading: '',
    comments: '',
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case DATA_INPUT_CHANGE:
      const { prop, value } = action.payload;
      if (prop === 'date') {
        return { ...state, [prop]: value}
      } else {
        const index = prop.indexOf('-');
        const dataObjStr = prop.substr(0, index) + 'Data';
        const dataObj = { ...state[dataObjStr] };
        const targetStr = prop.substr(index + 1);
        dataObj[targetStr] = value;
        return { ...state, [dataObjStr]: dataObj };
      }
    case CLEAR_DATA_FORM:
      return INITIAL_STATE;
    default: return state;
  };
};

export default reducer;
