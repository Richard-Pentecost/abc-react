import {
  USER_INPUT_CHANGE,
  CLEAR_USER_FORM,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  permissionLevel: 'user',
  oldPassword: '',
}

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case USER_INPUT_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CLEAR_USER_FORM:
      return INITIAL_STATE;
    default: return state;
  };
};

export default reducer;
