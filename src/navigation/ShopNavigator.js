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

function HamburgerMenu({ navigation }) {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => navigation.openDrawer()}
      />
    </HeaderButtons>
  );
}

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

function OrdersNavigator() {
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

const Drawer = createDrawerNavigator();

export default function ShopNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <Drawer.Screen name="Products" component={ProductsNavigator} />
      <Drawer.Screen name="Orders" component={OrdersNavigator} />
    </Drawer.Navigator>
  );
}
