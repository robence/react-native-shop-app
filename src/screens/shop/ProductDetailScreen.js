import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getSelectedProduct } from '../../store/selectors';
import Colors from '../../constants/Colors';

export default function ProductDetailScreen({ navigation, route }) {
  const { id } = route.params;

  const selectedProduct = useSelector(getSelectedProduct(id));

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
  },
});
