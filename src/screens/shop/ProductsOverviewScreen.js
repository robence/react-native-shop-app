import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { ProductItem } from '../../components/shop';
import Colors from '../../constants/Colors';

import * as CartActions from '../../ducks/cartDuck';

export default function ProductsOverviewScreen() {
  const products = useSelector((state) => state.products.availableProducts);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { addToCart } = bindActionCreators(CartActions, dispatch);

  const onSelect = ({ id, title }) =>
    navigation.navigate('ProductDetailScreen', { id, title });

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem item={item} onSelect={() => {}}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => onSelect(item)}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => addToCart(item)}
          />
        </ProductItem>
      )}
    />
  );
}
