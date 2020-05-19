import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as CartActions from '../../ducks/cartDuck';
import ProductItem from '../../components/shop/ProductItem';
import { bindActionCreators } from 'redux';

export default function ProductsOverviewScreen() {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const { addToCart } = bindActionCreators(CartActions, dispatch);

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem item={item} onAddToCart={() => addToCart(item)} />
      )}
    />
  );
}
