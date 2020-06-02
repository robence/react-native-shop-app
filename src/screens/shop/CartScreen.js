import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Colors from '../../constants/Colors';
import { CartItem } from '../../components/shop';
import * as CartActions from '../../ducks/cartDuck';

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
  const { removeFromCart } = bindActionCreators(CartActions, dispatch);

  const renderCartItem = ({ item }) => (
    <CartItem item={item} onRemove={() => removeFromCart(item.productId)} />
  );

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={cartItems.length === 0}
        />
      </View>
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
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: Colors.primary,
  },
  amount: {},
});
