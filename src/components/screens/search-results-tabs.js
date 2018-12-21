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
      tabBarIcon: (
        <Image source={ config.image }/>
      ),
    };
  },
});

SearchResultsTabs.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const config = tabConfig[routeName];
  return {
    headerTitle: 'Search Results',
    headerRight: (
      <Button
        title={ config.rightButtonTitle }
        onPress={ () => {} }
      />
    ),
  };
};

export default SearchResultsTabs;
