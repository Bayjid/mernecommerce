import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import {
  productsReducer,
  adminProductsReducer,
  newProductReducer,
  updateProductReducer,
  deleteProductReducer,
  productDetailsReducer,
} from "./reducers/productReducer";

import {
  loginReducer,
  registerReducer,
  loadUserReducer,
  logoutReducer  
} from "./reducers/authReducer";

import {
  profileReducer,  
} from "./reducers/userReducer";

import {
  createReviewReducer,
  reviewsOfSingleProductReducer,
  DeleteReviewReducer  
} from "./reducers/reviewReducer";

import {
  cartReducer,  
} from "./reducers/cartReducer";

import {

  allOrdersReducer,
  deleteOrderReducer,
  orderDetailsReducer,
  newOrderReducer,
  myOrdersReducer,
  updateOrderReducer,
    
} from "./reducers/orderReducer";




const reducer = combineReducers({

  products: productsReducer,
  adminProducts: adminProductsReducer,
  newProduct: newProductReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
  productDetails: productDetailsReducer,


  createReview :createReviewReducer,
  reviewsOfSingleProduct: reviewsOfSingleProductReducer,
  DeleteReview: DeleteReviewReducer,
  
  login: loginReducer,
  register: registerReducer,
  loadUser: loadUserReducer,
  logout:  logoutReducer,

  profile: profileReducer,

  cart: cartReducer,

  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders:  allOrdersReducer,
  updateOrder: updateOrderReducer,
  deleteOrder:  deleteOrderReducer,
  orderDetails:  orderDetailsReducer,

});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

    shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
    
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;