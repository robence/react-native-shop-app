import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import UserStackNavigator from './UserStackNavigator';
import ProductsStackNavigator from './ProductsStackNavigator';
import OrdersStackNavigator from './OrdersStackNavigator';

const Drawer = createDrawerNavigator();

type SelectedDrawerIcon = 'cart' | 'list' | 'create';
const MyDrawerIcon = (iconName: SelectedDrawerIcon) => (drawerConfig) =>
  (
    <Ionicons
      name={Platform.OS === 'android' ? `md-${iconName}` : `ios-${iconName}`}
      size={23}
      color={drawerConfig.color}
    />
  );

export default function ShopNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsStackNavigator}
        options={{
          drawerIcon: MyDrawerIcon('cart'),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersStackNavigator}
        options={{
          drawerIcon: MyDrawerIcon('list'),
        }}
      />
      <Drawer.Screen
        name="User"
        component={UserStackNavigator}
        options={{
          drawerIcon: MyDrawerIcon('create'),
        }}
      />
    </Drawer.Navigator>
  );
}
