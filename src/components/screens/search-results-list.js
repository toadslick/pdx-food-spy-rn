import React, { Component } from 'react';
import { Text, ActionSheetIOS } from 'react-native';
import styles from '../../styles/navigable-list';
import InspectionHistoryRequest from '../../requests/inspection-history';
import NavigableList from '../shared/navigable-list';

export default class SearchResultsList extends NavigableList {
  rhr = new InspectionHistoryRequest();

  get itemsParam() { return 'results'; }
  get requestResultsParam() { return 'history'; };
  get nextScreen() { return 'history'; };

  willFocus() {
    this.props.navigation.dangerouslyGetParent().setParams({
      activeTabScreen: this,
    });
  }

  headerRightButtonPressed() {
    const search = this.props.navigation.getParam('search');
    const options = [
      'Sort by Name',
      'Sort by Score',
      'Cancel',
    ];
    if (search.allowProximitySort) {
      options.unshift('Sort by Distance');
    }
    ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex: options.length - 1,
    },
    (optionIndex) => {
      console.log(`Sort option selected: ${options[optionIndex]}`);
    });
  }

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
