import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { ProductItem } from '../../components/shop';
import { getUserProducts } from '../../ducks/productsDuck';
import Colors from '../../constants/Colors';

export default function UserProductsScreen() {
  const userProducts = useSelector(getUserProducts);

  const onSelect = (item) => {};

  const onEdit = ({ id }) => {};

  const onDelete = ({ id }) => {};

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
