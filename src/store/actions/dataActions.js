import axios from 'axios';
import * as actionTypes from './actionTypes';
import TokenManager from '../../utils/token-manager';

const URL = 'http://localhost:3000/farms';

export const dataInputChange = ({ prop, value}) => {
  return {
    type: actionTypes.DATA_INPUT_CHANGE,
    payload: { prop, value },
  };
};

export const fetchDataSuccess = res => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    payload: res,
  }
};

const fetchDataFail = () => {
  return { type: actionTypes.FETCH_DATA_FAIL};
};

const fetchDataStart = () => {
  return { type: actionTypes.FETCH_DATA_START};
}

export const clearDataForm = () => {
  return { type: actionTypes.CLEAR_DATA_FORM };
};

const addDataFail = () => {
  return { type: actionTypes.ADD_DATA_FAIL };
}

export const clearState = () => {
  return { type: actionTypes.CLEAR_DATA_STATE };
};

export const initData = (id, search = '') => {
  return async dispatch => {
    try {
      dispatch(fetchDataStart())
      const response = await axios.get(`${URL}/${id}/data/${search}`);
      dispatch(fetchDataSuccess(response.data));
    } catch {
      dispatch(fetchDataFail());
    };
  };
};

export const addData = (data, id) => {
  return async dispatch => {
    try {
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      await axios.post(`${URL}/${id}/data`, data, axiosHeaders);
      dispatch(clearDataForm())
    } catch (error) {
      console.log(error);
      dispatch(addDataFail())
    };
  };
};

export const editData = (data, farmId, dataId) => {
  return async dispatch => {
    try {
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      await axios.patch(`${URL}/${farmId}/data/${dataId}`, data, axiosHeaders);
      dispatch(initData(farmId));
      dispatch(clearDataForm());
    } catch (error) {
      console.log(error);
    }
  }
};

export const deleteData = (farmId, dataId) => {
  return async dispatch => {
    try {
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      await axios.delete(`${URL}/${farmId}/data/${dataId}`, axiosHeaders);
      dispatch(initData(farmId));
    } catch (err) {
      console.log('[DeleteData]', err.response);
    };
  };
};
