import { combineReducers } from 'redux';

import productsReducer from '../ducks/productsDuck';
import cartReducer from '../ducks/cartDuck';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
