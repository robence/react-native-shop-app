import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EditProductScreen({ route }) {
  const productId = route.params?.id;

  return (
    <View>
      <Text>EditProductScreen {productId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
