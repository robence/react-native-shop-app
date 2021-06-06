import { combineReducers, Reducer } from 'redux';

import { productsReducer, cartReducer, ordersReducer } from '..';
import { RootAction, RootState } from './rootState';

const rootReducer: Reducer<RootState, RootAction> = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default rootReducer;
