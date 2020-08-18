import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ProductItem } from '../../components/shop';
import Colors from '../../constants/Colors';

import * as CartActions from '../../ducks/cartDuck';
import * as ProductActions from '../../ducks/productsDuck';

export default function ProductsOverviewScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const { addToCart } = bindActionCreators(CartActions, dispatch);

  useEffect(() => {
    const loadProducts = async () => {
      await dispatch(ProductActions.fetchProducts());
      setIsLoading(false);
    };

    setIsLoading(true);
    loadProducts();
  }, [dispatch]);

  const onSelect = ({ id, title }) =>
    navigation.navigate('ProductDetailScreen', { id, title });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem item={item} onSelect={() => onSelect(item)}>
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
