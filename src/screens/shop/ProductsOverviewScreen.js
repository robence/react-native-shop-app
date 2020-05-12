import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

export default function ProductsOverviewScreen() {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductItem item={item} />}
    />
  );
}
