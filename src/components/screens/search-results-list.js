import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList
} from 'react-native';

export default class SearchResultsList extends Component {
  static navigationOptions = {
    tabBarLabel: 'List',
  };

  render() {
    const results = this.props.navigation.getParam('results');
    return (
      <FlatList
        data={ results }
        renderItem={ this.renderListItem.bind(this) }
      />
    );
  }

  renderListItem({ item }) {
    return (
      <View>
        <Text>
          { item.name }
        </Text>
        <Text>
          { item.address }
        </Text>
        <Text>
          { item.score }
        </Text>
      </View>
    );
  }
}
