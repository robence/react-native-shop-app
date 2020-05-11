import { combineReducers } from 'redux';

import productsReducer from '../ducks/productsDuck';

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
