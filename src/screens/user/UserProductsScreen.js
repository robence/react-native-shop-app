import React from 'react';
import { FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ProductItem } from '../../components/shop';
import { getUserProducts } from '../../ducks/productsDuck';
import * as ProductActions from '../../ducks/productsDuck';
import Colors from '../../constants/Colors';

export default function UserProductsScreen({ navigation }) {
  const userProducts = useSelector(getUserProducts);
  const dispatch = useDispatch();

  const { deleteProduct } = bindActionCreators(ProductActions, dispatch);

  const onSelect = ({ id }) => {
    navigation.navigate('EditProductScreen', { id });
  };

  const onDelete = ({ id }) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      { text: 'Yes', style: 'destructive', onPress: () => deleteProduct(id) },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem item={item} onSelect={() => onSelect(item)}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => onSelect(item)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => onDelete(item)}
          />
        </ProductItem>
      )}
    />
  );
}
