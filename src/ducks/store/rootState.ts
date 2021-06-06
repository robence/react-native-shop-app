import { CartAction, CartState } from '../cartDuck';
import type { OrderAction, OrderState } from '../ordersDuck';
import type { ProductAction, ProductState } from '../productsDuck';

export type RootState = {
  products: ProductState;
  orders: OrderState;
  cart: CartState;
};

export type RootAction = ProductAction | OrderAction | CartAction;
