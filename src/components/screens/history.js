import React, { Component } from 'react';

import {
  View,
  Text,
} from 'react-native';

import NavigableList from '../shared/navigable-list';
import styles from '../../styles/screens/history';

const DATE_FORMAT = 'MMM D, YYYY';

export default class RestaurantHistory extends NavigableList {
  static navigationOptions = {
    headerTitle: 'Inspection History',
  }

  get itemsParam() { return 'history'; }
  get requestResultsParam() { return 'details'; };
  get nextScreen() { return 'details'; };

  render() {
    const item = this.state.items[0];
    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <Text style={ styles.title }>
            { item.name }
          </Text>
          <Text style={ styles.subtitle }>
            { item.address }
          </Text>
        </View>
        { this.renderList() }
      </View>
    );
  }

  listItemTitleText(item) {
    return item.moment.format(DATE_FORMAT);
  }

  renderListItemSubtitle(item) {
    const scoreBarStyle = {
      width: item.scorePercent + '%',
      backgroundColor: item.scoreColor,
    };

    return (
      <View style={ styles.scoreBarContainer }>
        <View style={ [styles.scoreBar, scoreBarStyle] } />
      </View>
    );
  }
}
