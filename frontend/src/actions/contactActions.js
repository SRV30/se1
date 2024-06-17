// src/actions/contactActions.js
import axios from 'axios';
import {
  CONTACT_SUBMIT_REQUEST,
  CONTACT_SUBMIT_SUCCESS,
  CONTACT_SUBMIT_FAIL,
  CONTACT_FETCH_REQUEST,
  CONTACT_FETCH_SUCCESS,
  CONTACT_FETCH_FAIL,
  DELETE_OLD_CONTACTS_SUCCESS,
  DELETE_OLD_CONTACTS_FAILURE
} from '../constants/contactConstants';

export const submitContactForm = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_SUBMIT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/se/submit', formData, config);

    dispatch({ type: CONTACT_SUBMIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_SUBMIT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const fetchContactForms = () => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_FETCH_REQUEST });

    const { data } = await axios.get('/api/se/see');

    dispatch({ type: CONTACT_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_FETCH_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteOldContacts = () => async (dispatch) => {
    try {
      await axios.delete('/api/se/deleteOld');
      dispatch({ type: DELETE_OLD_CONTACTS_SUCCESS });
      dispatch(fetchContactForms());
    } catch (error) {
      dispatch({
        type: DELETE_OLD_CONTACTS_FAILURE,
        payload: error.response.data.error
      });
    }
  };