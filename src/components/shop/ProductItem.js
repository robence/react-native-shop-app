import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import Colors from '../../constants/Colors';

export default function ProductItem({ item, onViewDetail, onCartDetail }) {
  const { title, price, imageUrl } = item;

  console.log(imageUrl);

  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </View>
      <View style={styles.detail}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={onViewDetail}
        />
        <Button color={Colors.primary} title="To Cart" onPress={onCartDetail} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
  detail: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
});
