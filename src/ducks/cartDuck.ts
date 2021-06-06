import CartItem from '../models/cart-item';
import Product from '../models/product';
import { ADD_ORDER } from './ordersDuck';
import { DELETE_PRODUCT } from './productsDuck';
import type { RootAction } from './store/rootState';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

type CartItemObject = {
  [key: string]: CartItem;
};

export type CartState = {
  items: CartItemObject;
  totalAmount: number;
};

const initialState: CartState = {
  items: {},
  totalAmount: 0,
};

export type CartAction = AddToCartAction | RemoveFromCartAction;

export default function cartReducer(
  state: CartState = initialState,
  action: RootAction,
) {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, price, title } = action.product;

      if (state.items[id]) {
        const { quantity, sum } = state.items[id];
        const updatedCartItem = new CartItem(
          quantity + 1,
          price,
          title,
          sum + price,
        );
        return updateCartItem(state, id, updatedCartItem);
      }

      return updateCartItem(state, id, new CartItem(1, price, title, price));

    case REMOVE_FROM_CART:
      const currentItem = state.items[action.productId];
      const { quantity, productPrice, productTitle, sum } = currentItem;

      if (quantity > 1) {
        const updatedCartItem = new CartItem(
          quantity - 1,
          productPrice,
          productTitle,
          sum - productPrice,
        );
        return updateCartItem(state, action.productId, updatedCartItem, true);
      }

      delete state.items[action.productId];

      return {
        ...state,
        totalAmount: state.totalAmount - productPrice,
      };
    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = updatedItems[action.productId].sum;
      delete updatedItems[action.productId];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    default:
      return state;
  }
}

function updateCartItem(
  state: CartState,
  id: string,
  newItem: CartItem,
  isSubtract = false,
) {
  return {
    ...state,
    items: {
      ...state.items,
      [id]: newItem,
    },
    totalAmount: isSubtract
      ? state.totalAmount - newItem.productPrice
      : state.totalAmount + newItem.productPrice,
  };
}

type AddToCartAction = {
  type: typeof ADD_TO_CART;
  product: Product;
};

export const addToCart = (product: Product) => ({
  type: ADD_TO_CART,
  product,
});

type RemoveFromCartAction = {
  type: typeof REMOVE_FROM_CART;
  productId: string;
};

export const removeFromCart = (productId: string) => ({
  type: REMOVE_FROM_CART,
  productId,
});
