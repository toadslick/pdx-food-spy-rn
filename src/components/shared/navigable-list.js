import React from 'react';

import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import styles from '../../styles/list-item';
import ListSeparator from './list-separator';
import BaseScreen from '../screens/_base';

export default class NavigableList extends BaseScreen {
  constructor(props) {
    super(props);
    console.log('PARAM', this.itemsParam);
    this.state.items = props.navigation.getParam(this.itemsParam);
    this.state.selectedItem = null;
  }

  get itemsParam()          { return null; }
  get requestResultsParam() { return null; };
  get nextScreen()          { return null; };

  willFocus() {
    this.setState({ selectedItem: null });
  }

  performRequest(item) {
    return Promise.reject('No request was specified for this list view.');
  }

  itemSelected(item) {
    this.setState({ selectedItem: item });
    this.requestAndNavigate(
      this.performRequest(item),
      this.nextScreen,
      this.requestResultsParam
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
