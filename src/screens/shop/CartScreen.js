import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import Colors from '../../constants/Colors';
import { CartItem } from '../../components/shop';
import * as CartActions from '../../ducks/cartDuck';
import * as OrdersActions from '../../ducks/ordersDuck';
import { Card } from '../../components/UI';

export default function CartScreen() {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) =>
    Object.entries(state.cart.items)
      .map(([key, value]) => ({
        productId: key,
        ...value,
      }))
      .sort((a, b) => (a.productId > b.productId ? 1 : -1))
  );

  const dispatch = useDispatch();
  const { removeFromCart, addOrder } = bindActionCreators(
    { ...CartActions, ...OrdersActions },
    dispatch
  );

  const renderCartItem = ({ item }) => (
    <CartItem item={item} onRemove={() => removeFromCart(item.productId)} />
  );

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={cartItems.length === 0}
          onPress={() => addOrder(cartItems, cartTotalAmount)}
        />
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
