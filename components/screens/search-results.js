import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class SearchResultsScreen extends Component {
  static navigationOptions = {
    title: 'Search Results',
  };

  render() {
    return (
      <View>
        <Text>Search Results Screen</Text>
      </View>
    );
  }
}
