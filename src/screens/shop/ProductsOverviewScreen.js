import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as CartActions from '../../ducks/cartDuck';
import ProductItem from '../../components/shop/ProductItem';

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
