import axios from "axios";

import {
  REVIEWSOFSINGLEPRODUCT_REQUEST,
  REVIEWSOFSINGLEPRODUCT_SUCCESS,
  REVIEWSOFSINGLEPRODUCT_FAIL,
  
  CREATEREVIEW_REQUEST,
  CREATEREVIEW_SUCCESS,
  CREATEREVIEW_FAIL,

  DELETEREVIEW_REQUEST,
  DELETEREVIEW_SUCCESS,
  DELETEREVIEW_FAIL,
  

  CLEAR_ERRORS,
} from "../constants/reviewConstants";


// Reviews Of Single Product
export const getReviewsOfSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: REVIEWSOFSINGLEPRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews/product/${id}`);

    dispatch({
      type: REVIEWSOFSINGLEPRODUCT_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: REVIEWSOFSINGLEPRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Create Review
export const createReview = (review, id) => async (dispatch) => {
  try {
    dispatch({ type: CREATEREVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/v1/review/${id}`, review, config);

    dispatch({
      type: CREATEREVIEW_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    dispatch({
      type: CREATEREVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Delete Review
export const deleteReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETEREVIEW_REQUEST });

    const { data } = await axios.delete(`/api/v1/review/${id}`);

    dispatch({ type: DELETEREVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETEREVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };