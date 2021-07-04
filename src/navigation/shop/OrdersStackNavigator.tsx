import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { OrdersScreen } from '../../screens/shop';
import HamburgerMenu from './HamburgerMenu';
import defaultNavOptions from './defaultNavOptions';

export type OrdersStackParamList = {
  OrdersScreen: undefined;
};

const Stack = createStackNavigator<OrdersStackParamList>();

export default function OrdersStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="OrdersScreen"
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerTitle: 'Your Orders',
          headerLeft: () => <HamburgerMenu navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}
