import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class SearchResultsList extends Component {
  static navigationOptions = {
    tabBarLabel: 'List',
  };

  render() {
    return (
      <View>
        <Text>Search Results List</Text>
      </View>
    );
  }
}
