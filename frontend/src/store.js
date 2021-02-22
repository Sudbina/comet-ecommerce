import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer } from './reducers/userReducers';
// constants -> reducers -> store -> actions

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userDetailsFromLocalStorage = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails'))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    userLogin: { userDetails: userDetailsFromLocalStorage },
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
