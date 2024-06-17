// src/reducers/contactReducers.js
import {
  CONTACT_SUBMIT_REQUEST,
  CONTACT_SUBMIT_SUCCESS,
  CONTACT_SUBMIT_FAIL,
  CONTACT_FETCH_REQUEST,
  CONTACT_FETCH_SUCCESS,
  CONTACT_FETCH_FAIL,
  DELETE_OLD_CONTACTS_SUCCESS,
  DELETE_OLD_CONTACTS_FAILURE,
} from "../constants/contactConstants";

export const contactSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_SUBMIT_REQUEST:
      return { loading: true };
    case CONTACT_SUBMIT_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case CONTACT_SUBMIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const contactFetchReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case CONTACT_FETCH_REQUEST:
      return { loading: true };
    case CONTACT_FETCH_SUCCESS:
      return { loading: false, contacts: action.payload };
    case CONTACT_FETCH_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_OLD_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DELETE_OLD_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
