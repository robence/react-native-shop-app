import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

export default function ProductsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ProductsOverviewScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}
    >
      <Stack.Screen
        name="ProductsOverviewScreen"
        component={ProductsOverviewScreen}
        options={{
          title: 'All Products',
        }}
      />
    </Stack.Navigator>
  );
}
