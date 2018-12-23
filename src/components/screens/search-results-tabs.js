import React from 'react';

import {
  Button,
  Image,
  View,
  Platform
} from 'react-native';

import { createBottomTabNavigator } from 'react-navigation';
import tabConfig from '../../utils/tab-config';

const navigatorConfig = Object.keys(tabConfig).reduce(function(acc, key) {
  acc[key] = tabConfig[key].screen;
  return acc;
}, {});

const SearchResultsTabs = createBottomTabNavigator(navigatorConfig, {
  defaultNavigationOptions: ({ navigation }) => {
    const config = tabConfig[navigation.state.routeName];
    return {
      tabBarLabel: config.tabTitle,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={ config.image }
          style={{ height: 25, width: 25, tintColor: tintColor }}
        />
      ),
    };
  },
});

SearchResultsTabs.navigationOptions = function({ navigation }) {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const config = tabConfig[routeName];
  const buttonPadding = Platform.select({ ios: 0, android: 10 });

  return {
    headerTitle: 'Search Results',
    headerRight: (
      <View style={{ paddingRight: buttonPadding }}>
        <Button
          title={ config.rightButtonTitle }
          onPress={ headerRightButtonPressed.bind(this, navigation) }
        />
      </View>
    ),
  };
};

// The right-hand button of the header belongs to the stack navigator,
// but needs to be able to communicate with screens of the tab navigator that
// is a child of the stack navigator.
//
// To do this, tab navigator screens set the `activeTabScreen` param of the
// stack navigator with a reference to themselves. Each screen that does this
// must have a `headerRightButtonPressed` function defined in their class.
function headerRightButtonPressed(navigation) {
  const tabScreen = navigation.getParam('activeTabScreen');
  if (tabScreen && tabScreen.headerRightButtonPressed) {
    tabScreen.headerRightButtonPressed.bind(tabScreen)();
  }
};

export default SearchResultsTabs;
