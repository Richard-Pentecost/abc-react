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

const fetchCurrentUserSuccess = (res) => {
  return {
    type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
    payload: res,
  };
};

const fetchCurrentUserFailed = () => {
  return {
    type: actionTypes.FETCH_CURRENT_USER_FAIL,
  };
};

const fetchCurrentUserStart = () => {
  return {
    type: actionTypes.FETCH_CURRENT_USER_START,
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

export const fetchUser = id => {
  return async dispatch => {
    try {
      dispatch(fetchCurrentUserStart());
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      const response = await axios.get(`${URL}/${id}`, axiosHeaders);
      dispatch(fetchCurrentUserSuccess(response.data));
    } catch (error) {
      dispatch(fetchCurrentUserFailed());
    }
  }
}

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

export const editUser = ({ name, username, id }) => {
  return async dispatch => {
    try {
      const data = { name, username };
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      await axios.patch(`${URL}/${id}/profile`, data, axiosHeaders);
      dispatch(fetchUser(id));
    } catch (error) {
      dispatch(addUserFail());
    };
  }
};

export const changePassword = data => {
  const { confirmNewPassword, id, ...passwordData } = data;

  return async dispatch => {
    if (confirmNewPassword !== passwordData.newPassword) {
      dispatch(addUserFail());
    } else {
      try {
        const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
        await axios.patch(`${URL}/${id}/security`, passwordData, axiosHeaders);
        dispatch(clearUserForm());
      } catch (error) {
        dispatch(addUserFail());
      };
    };
  };
};

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