import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { ProductItem } from '../../components/shop';
import { getUserProducts } from '../../ducks/productsDuck';

export default function UserProductsScreen() {
  const userProducts = useSelector(getUserProducts);

  console.log('userProducts');
  console.log(userProducts);
  return (
    <FlatList
      data={[]}
      renderItem={({ item }) => <ProductItem item={item} />}
    />
  );
}
