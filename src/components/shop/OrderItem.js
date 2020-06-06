import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';

export default function OrderItem({ order }) {
  const [showDetails, setShowDetails] = useState(false);

  const { items, totalAmount: amount } = order;

  return (
    <View style={styles.orderItem}>
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
            <CartItem key={cartItem.productId} item={cartItem} />
          ))}
        </View>
      )}
    </View>
  );
}

OrderItem.propTypes = {
  order: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.string,
        productPrice: PropTypes.number,
        productTitle: PropTypes.string,
        quantity: PropTypes.number,
        sum: PropTypes.number,
      })
    ),
    totalAmount: PropTypes.number,
  }).isRequired,
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
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
