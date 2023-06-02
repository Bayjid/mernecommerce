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


export const reviewsOfSingleProductReducer = (state = { reviews: [] }, action) => {

  switch (action.type) {

    case REVIEWSOFSINGLEPRODUCT_REQUEST:
        return {
        loading: true,
        reviews: [],
      };

    case REVIEWSOFSINGLEPRODUCT_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,        
      };
   
    case REVIEWSOFSINGLEPRODUCT_FAIL:
        return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;

  }
  
};

export const createReviewReducer = (state = { review: {} }, action) => {

  switch (action.type) {

    case CREATEREVIEW_REQUEST:
        return {
        ...state,  
        loading: true,
        
      };

    case CREATEREVIEW_SUCCESS:
      return {
        loading: false,
        review: action.payload,        
      };
   
    case CREATEREVIEW_FAIL:
        return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;

  }
  
};


export const DeleteReviewReducer = (state = {}, action) => {
  switch (action.type) {

    case DELETEREVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETEREVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETEREVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
