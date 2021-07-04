import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import {
  ProductsOverviewScreen,
  ProductDetailScreen,
  CartScreen,
} from '../../screens/shop';
import defaultNavOptions from './defaultNavOptions';
import HamburgerMenu from './HamburgerMenu';

export type ProductsStackParamList = {
  ProductsOverviewScreen: undefined;
  ProductDetailScreen: { title: string };
  CartScreen: undefined;
};

const Stack = createStackNavigator<ProductsStackParamList>();

export default function ProductsStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ProductsOverviewScreen"
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name="ProductsOverviewScreen"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          title: 'All Products',
          headerLeft: () => <HamburgerMenu navigation={navigation} />,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => navigation.navigate('CartScreen')}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerTitle: 'Your Cart' }}
      />
    </Stack.Navigator>
  );
}
