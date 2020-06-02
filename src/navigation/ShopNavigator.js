import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';
import {
  ProductsOverviewScreen,
  ProductDetailScreen,
  CartScreen,
  OrdersScreen,
} from '../screens/shop';

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
};

function ProductsNavigator() {
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
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
}

function OrdersNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="OrdersScreen"
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function ShopNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Products">
      <Drawer.Screen name="Products" component={ProductsNavigator} />
      <Drawer.Screen name="Orders" component={OrdersNavigator} />
    </Drawer.Navigator>
  );
}
