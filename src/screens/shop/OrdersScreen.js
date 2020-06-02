import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function OrdersScreen() {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <Text>{item.totalAmount}</Text>}
    />
  );
}

const styles = StyleSheet.create({});
