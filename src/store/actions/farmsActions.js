import axios from 'axios';
import * as actionTypes from './actionTypes';
import TokenManager from '../../utils/token-manager';

const URL = 'http://localhost:3000/farms';

const fetchFarms = (res) => {
  return {
    type: actionTypes.FETCH_FARMS,
    payload: res,
  };
};

const fetchFarmsFailed = () => {
  return {
    type: actionTypes.FETCH_FARMS_FAILED,
  };
};

export const clearFarmForm = () => {
  return {
    type: actionTypes.CLEAR_FARM_FORM,
  };
};

const addFarmFail = () => {
  return {
    type: actionTypes.ADD_FARM_FAIL,
  }
}

export const farmUpdate = ({ prop, value }) => {
  return {
    type: actionTypes.FARM_INPUT_UPDATE,
    payload: { prop, value },
  };
};

export const initFarms = (search = '') => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/${search}`);
      dispatch(fetchFarms(response.data));
    } catch (error) {
      dispatch(fetchFarmsFailed());
    }
  };
};

export const createFarm = data => {
  return async (dispatch) => {
    try {
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      await axios.post(URL, data, axiosHeaders);
      dispatch(clearFarmForm());
    } catch (error) {
      dispatch(addFarmFail());
    };
  };
};

export const editFarm = ({ farmName, postcode, contactName, contactNumber, id }) => {
  return async dispatch => {
    try {
      const data = { farmName, postcode, contactName, contactNumber};
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};
      await axios.patch(`${URL}/${id}`, data, axiosHeaders);
      dispatch(initFarms());
      dispatch(clearFarmForm());
      return;
    } catch (error) {
      dispatch(addFarmFail());
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
