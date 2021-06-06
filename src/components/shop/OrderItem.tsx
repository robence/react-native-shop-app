import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import { Card } from '../UI';
import Order from '../../models/order';

type OrderItemProps = {
  order: Order;
};

export default function OrderItem({ order }: OrderItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  const { items, totalAmount: amount } = order;

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{amount.toFixed(2)}</Text>
        <Text style={styles.date}>{order.readableDate()}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {items.map((cartItem) => (
            // TOOD: investigate id
            <CartItem key={cartItem.productId} item={cartItem} />
          ))}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
});
