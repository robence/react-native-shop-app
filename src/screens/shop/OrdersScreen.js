import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { OrderItem } from '../../components/shop';

export default function OrdersScreen() {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  );
}

const styles = StyleSheet.create({});
