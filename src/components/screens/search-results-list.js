import React, { Component } from 'react';

import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import styles from '../../styles/list-item';
import RestaurantHistoryRequest from '../../requests/restaurant-history';
import BaseScreen from './_base';

export default class SearchResultsList extends BaseScreen {
  static navigationOptions = {
    tabBarLabel: 'List',
  };

  constructor(props) {
    super(props);
    this.rhr = new RestaurantHistoryRequest();
    this.state.items = props.navigation.getParam('results');
    this.state.selectedItem = null;
  }

  willFocus() {
    this.setState({ selectedItem: null });
  }

  itemSelected(item) {
    this.setState({ selectedItem: item });
    const promise = this.rhr.fetch(item.restaurantID);
    this.requestAndNavigate(promise, 'history', 'history');
  }

  render() {
    return (
      <FlatList
        data={ this.state.items }
        renderItem={ this.renderListItem.bind(this) }
        ItemSeparatorComponent={ SearchResultListSeparator }
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
            { scoreOrSpinner }
          </View>
        </View>
      </TouchableHighlight>
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
