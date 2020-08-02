import axios from 'axios';
import * as actionTypes from './actionTypes';
import TokenManager from '../../utils/token-manager';
import { errorHandler } from '../../utils/api-errors';

const URL = 'http://localhost:3000/users';

const fetchUsersSuccess = res => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    payload: res,
  };
};

const fetchUsersFailed = error => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    payload: error,
  };
};

const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START,
  }
}

const fetchCurrentUserSuccess = res => {
  return {
    type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
    payload: res,
  };
};

const fetchCurrentUserFailed = error => {
  return {
    type: actionTypes.FETCH_CURRENT_USER_FAIL,
    payload: error,
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

const addUserStart = () => {
  return {
    type: actionTypes.ADD_USER_START,
  };
};

const addUserSuccess = () => {
  return {
    type: actionTypes.ADD_USER_SUCCESS,
  };
};

const addUserFail = error => {
  return {
    type: actionTypes.ADD_USER_FAIL,
    payload: error,
  }
}

export const clearUserSuccessFlag = () => {
  return {
    type: actionTypes.CLEAR_USER_SUCCESS_FLAG,
  };
};

export const clearUserErrorMessage = () => {
  return {
    type: actionTypes.CLEAR_USER_ERROR_MESSAGE,
  };
};

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
      dispatch(fetchUsersFailed(error));
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
      dispatch(fetchCurrentUserFailed(error));
    }
  }
}

export const createUser = data => {
  const { confirmPassword, ...userData } = data;
  return async (dispatch) => {
    if (confirmPassword !== userData.password) {
      dispatch(addUserFail('Passwords don\'t match'));
    } else {
      try {
        dispatch(addUserStart());
        const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
        await axios.post(URL, userData, axiosHeaders);
        setTimeout(() => {
          dispatch(addUserSuccess());
          dispatch(initUsers());
        }, 2000);
      } catch (error) {
        const errorMessage = errorHandler(error);
        dispatch(addUserFail(errorMessage));
      };
    }
  };
};

export const editUser = ({ name, username, id }) => {
  return async dispatch => {
    try {
      dispatch(addUserStart());
      const data = { name, username };
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      await axios.patch(`${URL}/${id}/profile`, data, axiosHeaders);
      setTimeout(() => {
        dispatch(addUserSuccess());
        dispatch(fetchUser(id));
      }, 2000);
    } catch (error) {
      const errorMessage = errorHandler(error);
      dispatch(addUserFail(errorMessage));
    };
  }
};

export const changePassword = data => {
  const { confirmNewPassword, id, ...passwordData } = data;

  return async dispatch => {
    if (confirmNewPassword !== passwordData.newPassword) {
      dispatch(addUserFail('Passwords must match'));
    } else {
      try {
        dispatch(addUserStart());
        const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
        await axios.patch(`${URL}/${id}/security`, passwordData, axiosHeaders);
        setTimeout(() => {
          dispatch(addUserSuccess());
        }, 2000);
      } catch (error) {
        const errorMessage = errorHandler(error);
        dispatch(addUserFail(errorMessage));
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