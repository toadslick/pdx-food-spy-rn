import React, { Component } from 'react';
import { View, Text, ActionSheetIOS } from 'react-native';
import styles from '../../styles/navigable-list';
import InspectionHistoryRequest from '../../requests/inspection-history';
import NavigableList from '../shared/navigable-list';
import { allowedSortOptions } from '../../utils/sort-options';
import ActionSheetOrModal from '../controls/action-sheet-or-modal';

export default class SearchResultsList extends NavigableList {
  request = new InspectionHistoryRequest();

  get itemsParam() { return 'results'; }
  get requestResultsParam() { return 'history'; }
  get nextScreen() { return 'history'; }

  constructor(props) {
    super(props);
    const search = this.props.navigation.getParam('search');
    this.state.sortOptions = allowedSortOptions(search);
  }

  willFocus() {
    this.props.navigation.dangerouslyGetParent().setParams({
      activeTabScreen: this,
    });
  }

  headerRightButtonPressed() {
    this.sortModal.present();
  }

  sortOptionSelected(index) {
    const { sortOptions, items } = this.state;
    const { sorter, title } = sortOptions[index];
    console.log(`Sort option selected: "${title}"`);
    this.setState({ items: items.sort(sorter) });
  }

  performRequest(item) {
    return this.request.fetch(item.restaurantID);
  }

  render() {
    const { sortOptions } = this.state;
    return (
      <View style={{ flex: 1 }}>
        { this.renderList() }
        <ActionSheetOrModal
          options={ sortOptions.map((opt) => opt.title) }
          onOptionSelected={ this.sortOptionSelected.bind(this) }
          cancelButtonIndex={ sortOptions.length - 1 }
          ref={ (c) => this.sortModal = c }
        />
      </View>
    );
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
