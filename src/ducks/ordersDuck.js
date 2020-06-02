/* eslint-disable no-case-declarations */
import Order from '../models/order';

const ADD_ORDER = 'ADD_ORDER';

const initialState = {
  orders: [],
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };

    default:
      return state;
  }
}

export const addOrder = (cartItems, totalAmount) => ({
  type: ADD_ORDER,
  orderData: {
    items: cartItems,
    amount: totalAmount,
  },
});
