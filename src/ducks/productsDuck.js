import PRODUCTS from '../data/dummy-data';
import Product from '../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter((prod) => prod.ownerId === 'u1'),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: filterById(state.userProducts, action.productId),
        availableProducts: filterById(
          state.availableProducts,
          action.productId,
        ),
      };

    case CREATE_PRODUCT:
      const { id, title, imageUrl, description, price } = action.productData;
      const newProduct = new Product(
        id,
        'u1',
        title,
        imageUrl,
        description,
        price,
      );

      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };

    case UPDATE_PRODUCT:
      const { productId, productData } = action;
      const productIndex = state.userProducts.findIndex(
        (product) => product.id === productId,
      );
      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === productId,
      );
      const updatedProduct = new Product(
        productId,
        state.userProducts[productIndex].ownerId,
        productData.title,
        productData.imageUrl,
        productData.description,
        state.userProducts[productIndex].price,
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

export const deleteProduct = (productId) => async (dispatch) => {
  const response = await fetch(
    `https://rn-complete-guide-a3ac3.firebaseio.com/products${productId}.json`,
    { method: 'DELETE' },
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  dispatch({
    type: DELETE_PRODUCT,
    productId,
  });
};

export const createProduct = (payload) => async (dispatch) => {
  const { title, description, imageUrl, price } = payload;
  // any async code you want!
  const response = await fetch(
    'https://rn-complete-guide-a3ac3.firebaseio.com/products.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, imageUrl, price }),
    },
  );

  const resData = await response.json();

  dispatch({
    type: CREATE_PRODUCT,
    productData: {
      id: resData.name,
      title,
      description,
      imageUrl,
      price,
    },
  });
};

export const updateProduct = (payload) => async (dispatch) => {
  const { id, title, description, imageUrl } = payload;

  const response = await fetch(
    `https://rn-complete-guide-a3ac3.firebaseio.com/products/${id}.json`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, imageUrl }),
    },
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  dispatch({
    type: UPDATE_PRODUCT,
    productId: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  });
};

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch(
      'https://rn-complete-guide-a3ac3.firebaseio.com/products.json',
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    const loadedProducts = [];

    for (const key in resData) {
      const { title, imageUrl, description, price } = resData[key];
      loadedProducts.push(
        new Product(key, 'u1', title, imageUrl, description, price),
      );
    }

    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const filterById = (list, id) => list.filter((item) => item.id !== id);

export const getSelectedProduct = (id) => (state) =>
  state.products.availableProducts.find((product) => product.id === id);

export const getUserProducts = (state) => state.products.userProducts;
