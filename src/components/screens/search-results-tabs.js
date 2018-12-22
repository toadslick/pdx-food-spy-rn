import React from 'react';
import { Button, Image } from 'react-native';
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

  return {
    headerTitle: 'Search Results',
    headerRight: (
      <Button
        title={ config.rightButtonTitle }
        onPress={ headerRightButtonPressed.bind(this, navigation) }
      />
    ),
  };
};

function headerRightButtonPressed(navigation) {
  const tabScreen = navigation.getParam('activeTabScreen');
  if (tabScreen && tabScreen.headerRightButtonPressed) {
    tabScreen.headerRightButtonPressed.bind(tabScreen)();
  }
};

export default SearchResultsTabs;
