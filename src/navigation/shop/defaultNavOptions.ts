import { Platform } from 'react-native';

import Colors from '../../constants/Colors';

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

export default defaultNavOptions;
