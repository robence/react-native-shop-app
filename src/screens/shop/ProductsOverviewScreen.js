import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Button,
  ActivityIndicator,
  View,
  Text,
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

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const { addToCart } = bindActionCreators(CartActions, dispatch);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(ProductActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [loadProducts]);

  const onSelect = ({ id, title }) =>
    navigation.navigate('ProductDetailScreen', { id, title });

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error ocurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={{}}>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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
