import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { getSelectedProduct } from '../../store/selectors';

export default function ProductDetailScreen({ navigation, route }) {
  const { id } = route.params;

  const selectedProduct = useSelector(getSelectedProduct(id));
  const { title } = selectedProduct;

  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
