import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { OrderItem } from '../../components/shop';
import { OrdersActions, selectOrders } from '../../ducks/ordersDuck';
import Colors from '../../constants/Colors';
import { useAppDispatch } from '../../ducks/store/store';

export default function OrdersScreen() {
  const [isLoading, setItLoading] = useState(false);

  const orders = useSelector(selectOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(OrdersActions.fetchOrders()).then(() => {
      setItLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
