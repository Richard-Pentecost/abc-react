import axios from 'axios';
import * as actionTypes from './actionTypes';
import TokenManager from '../../utils/token-manager';

const URL = 'http://localhost:3000/users';

const fetchUsersSuccess = (res) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    payload: res,
  };
};

const fetchUsersFailed = () => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
  };
};

const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START,
  }
}

export const clearUserForm = () => {
  return {
    type: actionTypes.CLEAR_USER_FORM,
  };
};

const addUserFail = () => {
  return {
    type: actionTypes.ADD_USER_FAIL,
  }
}

export const userUpdate = ({ prop, value }) => {
  return {
    type: actionTypes.USER_INPUT_CHANGE,
    payload: { prop, value },
  };
};

export const initUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchUsersStart());
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      const response = await axios.get(`${URL}`, axiosHeaders);
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailed());
    }
  };
};

export const createUser = data => {
  const { confirmPassword, ...userData } = data;
  return async (dispatch) => {
    if (confirmPassword !== userData.password) {
      dispatch(addUserFail());
    } else {
      try {
        const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
        await axios.post(URL, userData, axiosHeaders);
        dispatch(clearUserForm());
      } catch (error) {
        dispatch(addUserFail());
      };
    }
  };
};

// export const editFarm = ({ farmName, postcode, contactName, contactNumber, id }) => {
//   return async dispatch => {
//     try {
//       const data = { farmName, postcode, contactName, contactNumber};
//       const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
//       await axios.patch(`${URL}/${id}`, data, axiosHeaders);
//       dispatch(initFarms());
//       dispatch(clearFarmForm());
//       return;
//     } catch (error) {
//       dispatch(addFarmFail());
//     };
//   }
// };

export const deleteUser = id => {
  return async dispatch => {
    try {
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      await axios.delete(`${URL}/${id}`, axiosHeaders);
      dispatch(initUsers());
    } catch (err) {
      console.log('[Here]', err.response);
    };
  };
};