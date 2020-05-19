import CartItem from '../models/cart-item';

const ADD_TO_CART = 'ADD_TO_CART';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      // eslint-disable-next-line no-case-declarations
      const { id, price, title } = action.product;

      if (state.items[id]) {
        const { quantity, sum } = state.items[id];
        const updatedCartItem = new CartItem(
          quantity + 1,
          price,
          title,
          sum + price
        );
        return updateCartItem(state, id, updatedCartItem);
      }

      return updateCartItem(state, id, new CartItem(1, price, title, price));

    default:
      return state;
  }
}

function updateCartItem(state, id, newItem) {
  return {
    ...state,
    items: {
      ...state.items,
      [id]: newItem,
    },
    totalAmount: state.totalAmount + newItem.price,
  };
}

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});
