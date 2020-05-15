import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default function ProductItem({ item, onViewDetail, onCartDetail }) {
  const { title, price, imageUrl, id } = item;

  const navigation = useNavigation();

  const goToDetails = () =>
    navigation.navigate('ProductDetailScreen', { id, title });

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp activeOpacity={0.6} onPress={goToDetails} useForeground>
          <View>
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
                onPress={goToDetails}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={onCartDetail}
              />
            </View>
          </View>
        </TouchableCmp>
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
    height: '25%',
    paddingHorizontal: 20,
  },
  detail: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
});
