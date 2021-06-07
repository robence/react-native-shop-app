import React from 'react';
import { Platform } from 'react-native';
import {
  HeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

export default function CustomHeaderButton(props: HeaderButtonProps) {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />
  );
}
