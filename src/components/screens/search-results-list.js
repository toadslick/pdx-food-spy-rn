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
        renderItem={ renderListItem.bind(this) }
      />
    );
  }
}

const renderListItem = function({ item }) {
  return (
    <View
      style={ styles.listItem }
    >
      <View style={ styles.textView }>
        <Text style={ styles.title }>
          { item.name }
        </Text>
        <Text style={ styles.subtitle }>
          { item.address }
        </Text>
      </View>
      <View style={ styles.scoreView }>
        <Text style={ styles.score }>
          { item.score }
        </Text>
      </View>
    </View>
  );
};

const styles = {
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textView: {
    flexGrow: 100,
  },
  scoreView: {
    flexGrow: 1,
    textAlign: 'right',
  },
  title: {
    fontSize: 18,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  score: {
    fontSize: 30,
    fontWeight: '400',
  },
};
