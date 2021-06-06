import CartItem from '../models/cart-item';
import Order from '../models/order';
import type { RootState } from './store/rootState';
import type { AppDispatch } from './store/store';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export type OrderState = {
  orders: Order[];
};

const initialState: OrderState = {
  orders: [],
};

export type OrderAction = AddOrderAction | FetchOrdersAction;

export default function ordersReducer(
  state: OrderState = initialState,
  action: OrderAction,
) {
  switch (action.type) {
    case SET_ORDERS: {
      return {
        orders: action.orders,
      };
    }
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date,
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };

    default:
      return state;
  }
}

type FetchOrdersAction = {
  type: typeof SET_ORDERS;
  orders: Order[];
};

export const fetchOrders = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(
      'https://rn-complete-guide-a3ac3.firebaseio.com/orders/u1.json',
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    const loadedOrders: Order[] = [];

    for (const key in resData) {
      const { cartItems, date, totalAmount } = resData[key];
      loadedOrders.push(new Order(key, cartItems, totalAmount, new Date(date)));
    }

    dispatch({
      type: SET_ORDERS,
      orders: loadedOrders,
    });
  } catch (err) {
    throw err;
  }
};

type AddOrderAction = {
  type: typeof ADD_ORDER;
  orderData: {
    id: string;
    items: CartItem[];
    amount: number;
    date: Date;
  };
};

export const addOrder =
  (cartItems: CartItem[], totalAmount: number) =>
  async (dispatch: AppDispatch) => {
    const date = new Date();
    const response = await fetch(
      'https://rn-complete-guide-a3ac3.firebaseio.com/orders/u1.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  };

export const OrdersActions = {
  addOrder,
  fetchOrders,
};

export const selectOrders = (state: RootState) => state.orders.orders;
