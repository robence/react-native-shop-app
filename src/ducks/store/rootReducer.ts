import { combineReducers } from 'redux';

import { productsReducer, cartReducer, ordersReducer } from '..';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default rootReducer;
