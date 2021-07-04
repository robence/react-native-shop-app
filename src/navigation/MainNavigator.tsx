import React from 'react';

import ShopNavigator from './shop/ShopDrawerNavigator';
import AuthNavigator from './AuthNavigator';

export default function MainNavigator() {
  // TODO: use authentication flow
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <AuthNavigator />;
  }

  return <ShopNavigator />;
}
