import PRODUCTS from '../data/dummy-data';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

const initialState = {
  availableProducts: PRODUCTS,
  userProduct: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProduct: filterById(state.userProduct, action.productId),
        availableProducts: filterById(
          state.availableProducts,
          action.productId
        ),
      };
    default:
      return state;
  }
}

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

const filterById = (list, id) => list.filter((item) => item.id !== id);

export const getSelectedProduct = (id) => (state) =>
  state.products.availableProducts.find((product) => product.id === id);

export const getUserProducts = (state) => state.products.userProduct;
