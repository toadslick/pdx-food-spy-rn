import React, { Component } from 'react';

import {
  View,
  Text,
} from 'react-native';

import NavigableList from '../shared/navigable-list';
import styles from '../../styles/screens/inspection-history';
import InspectionDetailsRequest from '../../requests/inspection-details';

export default class InspectionHistory extends NavigableList {
  request = new InspectionDetailsRequest();
  dateFormat = 'MMM D, YYYY';

  get itemsParam() { return 'history'; }
  get requestResultsParam() { return 'violations'; }
  get nextScreen() { return 'details'; }

  performRequest(item) {
    return this.request.fetch(item.inspectionID);
  }

  additionalParams(item) {
    return { inspection: item };
  }

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
    return item.moment.format(this.dateFormat);
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
