import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from '../../styles/list-item';
import InspectionHistoryRequest from '../../requests/inspection-history';
import NavigableList from '../shared/navigable-list';

export default class SearchResultsList extends NavigableList {
  static navigationOptions = {
    tabBarLabel: 'List',
  };
  rhr = new InspectionHistoryRequest();

  get itemsParam() { return 'results'; }
  get requestResultsParam() { return 'history'; };
  get nextScreen() { return 'history'; };

  performRequest(item) {
    return this.rhr.fetch(item.restaurantID);
  }

  render() {
    return this.renderList();
  }

  listItemTitleText(item) {
    return item.name;
  }

  renderListItemSubtitle(item) {
    return (
      <Text
        style={ styles.subtitle }
        numberOfLines={ 1 }
      >
        { item.address }
      </Text>
    );
  }
}
