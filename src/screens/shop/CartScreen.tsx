import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import Colors from '../../constants/Colors';
import { CartItem } from '../../components/shop';
import { CartActions } from '../../ducks/cartDuck';
import { OrdersActions } from '../../ducks/ordersDuck';
import { Card } from '../../components/UI';
import type { RootState } from '../../ducks/store/rootState';

export default function CartScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector(
    (state: RootState) => state.cart.totalAmount,
  );

  const cartItems = useSelector((state: RootState) =>
    Object.entries(state.cart.items)
      .map(([key, value]) => ({
        productId: key,
        ...value,
      }))
      .sort((a, b) => (a.productId > b.productId ? 1 : -1)),
  );

  const dispatch = useDispatch();
  const { removeFromCart, addOrder } = bindActionCreators(
    { ...CartActions, ...OrdersActions },
    dispatch,
  );

  const renderCartItem = ({ item }) => (
    <CartItem item={item} onRemove={() => removeFromCart(item.productId)} />
  );

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await addOrder(cartItems, cartTotalAmount);
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(Number(cartTotalAmount.toFixed(2)) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            title="Order Now"
            color={Colors.accent}
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={renderCartItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: Colors.primary,
  },
  amount: {},
});
