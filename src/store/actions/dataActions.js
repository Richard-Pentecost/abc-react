import axios from 'axios';
import * as actionTypes from './actionTypes';
import { editFarm } from './farmsActions';
import _ from 'lodash';
import TokenManager from '../../utils/token-manager';

const URL = 'https://abc-app-api.herokuapp.com/farms';

export const dataInputChange = ({ prop, value}) => {
  return {
    type: actionTypes.DATA_INPUT_CHANGE,
    payload: { prop, value },
  };
};

const fetchDataSuccess = res => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    payload: res,
  }
};

const fetchDataFail = error => {
  return { 
    type: actionTypes.FETCH_DATA_FAIL,
    payload: error,
  };
};

const fetchDataStart = () => {
  return { type: actionTypes.FETCH_DATA_START };
}

export const clearDataForm = () => {
  return { type: actionTypes.CLEAR_DATA_FORM };
};

const addDataStart = () => {
  return { type: actionTypes.ADD_DATA_START}
}
const addDataFail = error => {
  return { 
    type: actionTypes.ADD_DATA_FAIL,
    payload: error, 
  };
};

const addDataSuccess = () => {
  return { 
    type: actionTypes.ADD_DATA_SUCCESS,
  };
};

export const clearDataSuccessFlag = () => {
  return { type: actionTypes.CLEAR_DATA_SUCCESS_FLAG };
};

export const clearDataErrorMessage = () => {
  return { type: actionTypes.CLEAR_DATA_ERROR_MESSAGE };
};

export const clearState = () => {
  return { type: actionTypes.CLEAR_DATA_STATE };
};

export const initData = (id, search = '') => {
  return async dispatch => {
    try {
      dispatch(fetchDataStart())
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      const response = await axios.get(`${URL}/${id}/data/${search}`, axiosHeaders);
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFail(error));
    };
  };
};

export const addData = (data, previousData, id) => {
  return async dispatch => {
    try {
      dispatch(addDataStart());
      const dataObj = { ...data, ...previousData };
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      const response = await axios.post(`${URL}/${id}/data`, dataObj, axiosHeaders);
      dispatch(addDataSuccess());
      const farmData = { 
        data: {
          lastVisit: response.data.date, 
          acidDeliveryDate: response.data.acidData.deliveryDate,
          chlorineDeliveryDate: response.data.chlorineData.deliveryDate,
        },
      };
      dispatch(editFarm(farmData, id))
    } catch (error) {
      const errors = error.response.data.errors;
      const errArr = _.filter(errors, err => {
        return err !== null
      });
      let errorMessage;
      errArr.length === 0 ?
        errorMessage = 'A network error has occured. Please try again'
        : errorMessage = errArr[0];
      dispatch(addDataFail(errorMessage));
    };
  };
};

export const editData = (data, previousData, farmId, dataId) => {
  return async dispatch => {
    try {
      dispatch(addDataStart());
      const dataObj = { ...data, ...previousData };
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      const response = await axios.patch(`${URL}/${farmId}/data/${dataId}`, dataObj, axiosHeaders);
      dispatch(addDataSuccess());
      const farmData = { 
        data: {
          lastVisit: response.data.date, 
          acidDeliveryDate: response.data.acidData.deliveryDate,
          chlorineDeliveryDate: response.data.chlorineData.deliveryDate,
        },
      };
      dispatch(editFarm(farmData, farmId))
    } catch (error) {
      const errors = error.response.data.errors;
      const errArr = _.filter(errors, err => {
        return err !== null
      });
      let errorMessage;
      errArr.length === 0 ?
        errorMessage = 'A network error has occured. Please try again'
        : errorMessage = errArr[0];
      dispatch(addDataFail(errorMessage));
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
