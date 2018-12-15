import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import SearchResultsList from './search-results-list';
import SearchResultsMap from './search-results-map';

export default createBottomTabNavigator({
  list: SearchResultsList,
  map: SearchResultsMap,
});
