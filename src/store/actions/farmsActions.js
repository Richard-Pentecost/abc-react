import axios from 'axios';
import * as actionTypes from './actionTypes';
import TokenManager from '../../utils/token-manager';
import { errorHandler } from '../../utils/api-errors';

const URL = 'https://abc-app-api.herokuapp.com/farms';

export const farmInputChange = ({ prop, value }) => {
  return {
    type: actionTypes.FARM_INPUT_UPDATE,
    payload: { prop, value },
  };
};

const fetchFarmsSuccess = res => {
  return {
    type: actionTypes.FETCH_FARMS_SUCCESS,
    payload: res,
  };
};

const fetchFarmsFail = error => {
  return {
    type: actionTypes.FETCH_FARMS_FAIL,
    payload: error,
  };
};

const fetchFarmsStart = () => {
  return {
    type: actionTypes.FETCH_FARMS_START,
  };
}

const fetchActiveFarmsStart = () => {
  return {
    type: actionTypes.FETCH_ACTIVE_FARMS_START,
  };
};

const fetchActiveFarmsSuccess = res => {
  return {
    type: actionTypes.FETCH_ACTIVE_FARMS_SUCCESS,
    payload: res,
  };
};

const fetchActiveFarmsFail = error => {
  return {
    type: actionTypes.FETCH_ACTIVE_FARMS_FAIL,
    payload: error,
  };
};

export const clearFarmForm = () => {
  return {
    type: actionTypes.CLEAR_FARM_FORM,
  };
};

const addFarmStart = () => {
  return { 
    type: actionTypes.ADD_FARM_START 
  };
};

const addFarmFail = error => {
  return {
    type: actionTypes.ADD_FARM_FAIL,
    payload: error,
  }
}

const addFarmSuccess = () => {
  return {
    type: actionTypes.ADD_FARM_SUCCESS,
  };
};

export const clearFarmSuccessFlag = () => {
  return {
    type: actionTypes.CLEAR_FARM_SUCCESS_FLAG,
  };
};

export const clearFarmErrorMessage = () => {
  return {
    type: actionTypes.CLEAR_FARM_ERROR_MESSAGE,
  };
};

export const initFarms = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchFarmsStart());
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      const response = await axios.get(`${URL}/list`, axiosHeaders);
      dispatch(fetchFarmsSuccess(response.data));
    } catch (error) {
      dispatch(fetchFarmsFail(error));
    }
  };
};
 
export const initActiveFarms = (search = '') => {
  return async (dispatch) => {
    try {
      dispatch(fetchActiveFarmsStart());
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      const response = await axios.get(`${URL}/${search}`, axiosHeaders);
      dispatch(fetchActiveFarmsSuccess(response.data));
    } catch (error) {
      dispatch(fetchActiveFarmsFail(error));
    }
  };
}

export const createFarm = data => {
  return async (dispatch) => {
    try {
      dispatch(addFarmStart());
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      await axios.post(URL, data, axiosHeaders);
      dispatch(addFarmSuccess());
    } catch (error) {
      const errorMessage = errorHandler(error);
      dispatch(addFarmFail(errorMessage));
    };
  };
};

export const editFarm = (data, id) => {
  return async dispatch => {
    try {
      dispatch(addFarmStart());
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      await axios.patch(`${URL}/${id}`, data, axiosHeaders);
      dispatch(addFarmSuccess());
      dispatch(initFarms());
    } catch (error) {
      const errorMessage = errorHandler(error);
      dispatch(addFarmFail(errorMessage));
    };
  }
};

export const deleteFarm = id => {
  return async dispatch => {
    try {
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      await axios.delete(`${URL}/${id}`, axiosHeaders);
      dispatch(initFarms());
    } catch (err) {
      console.log('[Here]', err.response);
    };
  };
};
