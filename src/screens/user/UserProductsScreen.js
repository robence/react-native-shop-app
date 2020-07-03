import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigation } from '@react-navigation/native';
import { ProductItem } from '../../components/shop';
import { getUserProducts } from '../../ducks/productsDuck';
import Colors from '../../constants/Colors';

import * as ProductActions from '../../ducks/productsDuck';

export default function UserProductsScreen() {
  const userProducts = useSelector(getUserProducts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { deleteProduct } = bindActionCreators(ProductActions, dispatch);

  const onSelect = ({ id }) => {
    navigation.navigate('EditProductScreen', { id });
  };

  const onEdit = onSelect;

  const onDelete = ({ id }) => {
    deleteProduct(id);
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem item={item} onSelect={() => onSelect(item)}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => onEdit(item)}
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
