import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
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
        keyExtractor={ keyExtractor }
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
      style={ styles.listItem }
    >
      <View style={ styles.textView }>
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
      <View style={ styles.scoreView }>
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

function keyExtractor(item) {
  return item.inspectionID;
};

const styles = {
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  textView: {
    flexShrink: 1,
  },
  scoreView: {
    flexShrink: 0,
    paddingLeft: 8,
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
    textAlign: 'right',
  },
};
