import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductItem } from '../../components/shop';
import { getUserProducts } from '../../ducks/productsDuck';
import Colors from '../../constants/Colors';

import * as ProductActions from '../../ducks/productsDuck';

export default function UserProductsScreen() {
  const userProducts = useSelector(getUserProducts);
  const dispatch = useDispatch();

  const { deleteProduct } = bindActionCreators(ProductActions, dispatch);

  const onSelect = (item) => {};

  const onEdit = ({ id }) => {};

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
