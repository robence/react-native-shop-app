import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import { Card } from '../UI';

export default function ProductItem({ item, children, onSelect }) {
  const { title, price, imageUrl } = item;

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp activeOpacity={0.6} onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: imageUrl }} />
            </View>
            <View style={styles.detail}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
}

ProductItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    ownerId: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
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
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
  detail: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
});
