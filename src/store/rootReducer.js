import { combineReducers } from 'redux';

import productsReducer from '../ducks/productsDuck';
import cartReducer from '../ducks/cartDuck';
import ordersReducer from '../ducks/ordersDuck';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: ordersReducer,
});

export default rootReducer;
