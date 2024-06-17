import {
    FETCH_ABOUT_US_SUCCESS,
    FETCH_ABOUT_US_FAILURE,
    UPDATE_ABOUT_US_SUCCESS,
    UPDATE_ABOUT_US_FAILURE
  } from '../constants/aboutConstants';
  
  const aboutUsReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_ABOUT_US_SUCCESS:
        return {
          ...state,
          aboutUs: action.payload,
          loading: false,
          error: null
        };
      case FETCH_ABOUT_US_FAILURE:
        return {
          ...state,
          aboutUs: null,
          loading: false,
          error: action.payload
        };
      case UPDATE_ABOUT_US_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        };
      case UPDATE_ABOUT_US_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default aboutUsReducer;