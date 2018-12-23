import React from 'react';

import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import styles from '../../styles/navigable-list';
import ListSeparator from './list-separator';
import BaseScreen from '../screens/_base';

// This class should be extended by any screen which displays a flat list
// and allows the user to select a list item to navigate to the next screen.
export default class NavigableList extends BaseScreen {
  constructor(props) {
    super(props);
    this.state.items = props.navigation.getParam(this.itemsParam);
    this.state.selectedItem = null;
  }

  // The name of the param of the navigator which contains the items to be displayed.
  get itemsParam() { return null; }

  // The name of the param on the next screen to which API results will be passed.
  get requestResultsParam() { return null; };

  // The name of the next screen to navigate to.
  get nextScreen() { return null; };

  // When the user returns to this list (using the back button, for example),
  // deselect the currently selected list item.
  willFocus() {
    this.setState({ selectedItem: null });
  }

  // An object of additional params (beyond the API request results),
  // that will be passed to the next screen.
  additionalParams() {
    return {};
  }

  // Returns the promise of the API request performed when a list item was selected.
  performRequest(selectedItem) {
    return Promise.reject('No request was specified for this list view.');
  }

  itemSelected(item) {
    this.setState({ selectedItem: item });
    this.requestAndNavigate(
      this.performRequest(item),
      this.nextScreen,
      this.requestResultsParam,
      this.additionalParams(item),
    );
  }

  renderList() {
    return (
      <FlatList
        data={ this.state.items }
        renderItem={ this.renderListItem.bind(this) }
        ItemSeparatorComponent={ ListSeparator }
        extraData={ this.state }
      />
    );
  }

  renderListItem({ item }) {
    const isSelected = (this.state.selectedItem === item);

    let itemStyle;
    if (isSelected) {
      itemStyle = styles.activeCell;
    }

    let scoreOrSpinner;
    if (isSelected && this.state.isBusy) {
      scoreOrSpinner = (
        <ActivityIndicator
          size='large'
          hidesWhenStopped
          animating={ this.state.isBusy }
          color='#000'
        />
      );
    } else {
      scoreOrSpinner = (
        <Text
          style={ [styles.score, { color: item.scoreColor }] }
          numberOfLines={ 1 }
        >
          { item.score }
        </Text>
      );
    }


    return (
      <TouchableHighlight
        onPress={ this.itemSelected.bind(this, item) }
      >
        <View style={ [styles.cell, itemStyle] }>
          <View style={ styles.textContainer }>
            <Text
              style={ styles.title }
              numberOfLines={ 1 }
            >
              { this.listItemTitleText(item) }
            </Text>
            <View>
              { this.renderListItemSubtitle(item) }
            </View>
          </View>
          <View style={ styles.scoreContainer }>
            { scoreOrSpinner }
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  listItemTitleText(item) {
    return '';
  }

  renderListItemSubtitle(item) {
    return (
      <View/>
    );
  }
}
