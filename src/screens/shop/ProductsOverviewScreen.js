import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

export default function ProductsOverviewScreen() {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
}
