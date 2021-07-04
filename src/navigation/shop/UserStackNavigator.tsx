import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import { UserProductsScreen, EditProductScreen } from '../../screens/user';
import HamburgerMenu from './HamburgerMenu';
import defaultNavOptions from './defaultNavOptions';

export type UserStackParamList = {
  UserProductsScreen: undefined;
  EditProductScreen: undefined | { id: string; onSubmit: () => void };
};

const Stack = createStackNavigator<UserStackParamList>();

export default function UserStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="UserProductsScreen"
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          headerTitle: 'Your Products',
          headerLeft: () => <HamburgerMenu navigation={navigation} />,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName={
                  Platform.OS === 'android' ? 'md-create' : 'ios-create'
                }
                onPress={() => navigation.navigate('EditProductScreen')}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={({ navigation, route }) => ({
          headerTitle: route.params?.id ? 'Edit Product' : 'Add Product',
          headerLeft: () => <HamburgerMenu navigation={navigation} />,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName="md-checkmark"
                onPress={route.params?.onSubmit}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
