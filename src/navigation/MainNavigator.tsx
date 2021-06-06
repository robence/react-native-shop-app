import React from 'react';

import ShopNavigator from './ShopNavigator';
import AuthNavigator from './AuthNavigator';

export default function MainNavigator() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <AuthNavigator />;
  }

  return <ShopNavigator />;
}
