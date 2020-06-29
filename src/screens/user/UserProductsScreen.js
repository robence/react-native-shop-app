import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { ProductItem } from '../../components/shop';
import { getUserProducts } from '../../ducks/productsDuck';

export default function UserProductsScreen() {
  const userProducts = useSelector(getUserProducts);

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => <ProductItem item={item} />}
    />
  );
}
