import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default function CartItem({ item, onRemove }) {
  const { quantity, productTitle: title, sum: amount } = item;
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{title}</Text>
      </View>
      <View>
        <Text style={styles.mainText}>{amount.toFixed(2)}</Text>
        {onRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

CartItem.defaultProps = {
  onRemove: null,
};

CartItem.propTypes = {
  item: PropTypes.shape({
    quantity: PropTypes.number,
    productPrice: PropTypes.number,
    productTitle: PropTypes.string,
    sum: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
