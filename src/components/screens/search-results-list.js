import React, { Component } from 'react';
import { Text, ActionSheetIOS } from 'react-native';
import styles from '../../styles/navigable-list';
import InspectionHistoryRequest from '../../requests/inspection-history';
import NavigableList from '../shared/navigable-list';
import { allowedSortOptions } from '../../utils/sort-options';

export default class SearchResultsList extends NavigableList {
  request = new InspectionHistoryRequest();

  get itemsParam() { return 'results'; }
  get requestResultsParam() { return 'history'; }
  get nextScreen() { return 'history'; }

  willFocus() {
    this.props.navigation.dangerouslyGetParent().setParams({
      activeTabScreen: this,
    });
  }

  headerRightButtonPressed() {
    const search = this.props.navigation.getParam('search');
    const options = allowedSortOptions(search);
    ActionSheetIOS.showActionSheetWithOptions({
      options: options.map((option) => option.title),
      cancelButtonIndex: options.length - 1,
    },
    (selectedOptionIndex) => {
      const option = options[selectedOptionIndex];
      const sorted = this.state.items.sort(option.sorter);
      console.log(`Sort option selected: "${option.title}"`);
      this.setState({ items: sorted });
    });
  }

  performRequest(item) {
    return this.request.fetch(item.restaurantID);
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
