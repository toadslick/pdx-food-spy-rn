import React, { Component } from 'react';
import { Button } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import SearchResultsList from './search-results-list';
import SearchResultsMap from './search-results-map';

const SearchResultsTabs = createBottomTabNavigator({
  list: SearchResultsList,
  map: SearchResultsMap,
});

const headerTitles = {
  list: 'Search Results List',
  map: 'Search Results Map',
};

const buttonTitles = {
  list: 'Sort',
  map: 'Reset',
};

SearchResultsTabs.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  return {
    headerTitle: headerTitles[routeName],
    headerRight: (
      <Button
        title={buttonTitles[routeName]}
        onPress={() => {}}
      />
    ),
  };
};

export default SearchResultsTabs;
