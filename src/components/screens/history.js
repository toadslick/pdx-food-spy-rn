import React, { Component } from 'react';
import { View } from 'react-native';
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
    return this.renderList();
  }

  listItemTitleText(item) {
    return item.moment.format(DATE_FORMAT);
  }

  renderListItemSubtitle(item) {
    console.log('PERCENT', item.scorePercent);
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
