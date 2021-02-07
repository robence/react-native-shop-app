import Order from '../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

const initialState = {
  orders: [],
};

export default function ordersReducer(state = initialState, action) {
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
export const fetchOrders = () => async (dispatch) => {
  try {
    const response = await fetch(
      'https://rn-complete-guide-a3ac3.firebaseio.com/orders/u1.json',
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    const loadedOrders = [];

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

export const addOrder = (cartItems, totalAmount) => async (dispatch) => {
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
