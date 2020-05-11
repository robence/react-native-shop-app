import PRODUCTS from '../data/dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  userProduct: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
