/* eslint-disable no-case-declarations */
import PRODUCTS from '../data/dummy-data';
import Product from '../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: filterById(state.userProducts, action.productId),
        availableProducts: filterById(
          state.availableProducts,
          action.productId
        ),
      };

    case CREATE_PRODUCT:
      const { title, imageUrl, description, price } = action.productData;
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        title,
        imageUrl,
        description,
        price
      );

      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };

    case UPDATE_PRODUCT:
      const { productId, productData } = action;
      const productIndex = state.userProducts.findIndex(
        (product) => product.id === productId
      );
      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === productId
      );
      const updatedProduct = new Product(
        productId,
        state.userProducts[productIndex].ownerId,
        productData.title,
        productData.imageUrl,
        productData.description,
        state.userProducts[productIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      const updatedAvailableProducts = [...state.availableProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    default:
      return state;
  }
}

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

export const createProduct = ({ title, description, imageUrl, price }) => ({
  type: CREATE_PRODUCT,
  productData: {
    title,
    description,
    imageUrl,
    price,
  },
});

export const updateProduct = ({ id, title, description, imageUrl }) => ({
  type: UPDATE_PRODUCT,
  productId: id,
  productData: {
    title,
    description,
    imageUrl,
  },
});

const filterById = (list, id) => list.filter((item) => item.id !== id);

export const getSelectedProduct = (id) => (state) =>
  state.products.availableProducts.find((product) => product.id === id);

export const getUserProducts = (state) => state.products.userProducts;
