import React, { Component } from 'react';

import {
  Text,
  View,
  FlatList,
} from 'react-native';

import styles from '../../styles/list-item';

export default class SearchResultsList extends Component {
  static navigationOptions = {
    tabBarLabel: 'List',
  };

  constructor(props) {
    super(props);
    this.state = {
      results: props.navigation.getParam('results'),
    };
  }

  render() {
    return (
      <FlatList
        data={ this.state.results }
        renderItem={ renderListItem.bind(this) }
        ItemSeparatorComponent={ SearchResultListSeparator }
      />
    );
  }
}

class SearchResultListSeparator extends Component {
  render() {
    return (
      <View style={ styles.separator }/>
    );
  }
}

function renderListItem({ item }) {
  return (
    <View
      style={ styles.cell }
    >
      <View style={ styles.textContainer }>
        <Text
          style={ styles.title }
          numberOfLines={ 1 }
        >
          { item.name }
        </Text>
        <Text
          style={ styles.subtitle }
          numberOfLines={ 1 }
        >
          { item.address }
        </Text>
      </View>
      <View style={ styles.scoreContainer }>
        <Text
          style={ [styles.score, { color: item.scoreColor }] }
          numberOfLines={ 1 }
        >
          { item.score }
        </Text>
      </View>
    </View>
  );
};
