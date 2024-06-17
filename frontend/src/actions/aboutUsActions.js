import axios from 'axios';
import {
  FETCH_ABOUT_US_SUCCESS,
  FETCH_ABOUT_US_FAILURE,
  UPDATE_ABOUT_US_SUCCESS,
  UPDATE_ABOUT_US_FAILURE
} from '../constants/aboutConstants';

export const fetchAboutUs = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/se/get/about-us');
    dispatch({
      type: FETCH_ABOUT_US_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_ABOUT_US_FAILURE,
      payload: error.response.data.error
    });
  }
};

export const updateAboutUs = (aboutUsData) => async (dispatch) => {
  try {
    const response = await axios.put('/api/se/update/about-us', aboutUsData);
    dispatch({
      type: UPDATE_ABOUT_US_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ABOUT_US_FAILURE,
      payload: error.response.data.error
    });
  }
};
