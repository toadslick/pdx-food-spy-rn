import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class SearchResultsMap extends Component {
  static navigationOptions = {
    tabBarLabel: 'Map',
  };

  render() {
    return (
      <View>
        <Text>Search Results Map</Text>
      </View>
    );
  }
}
