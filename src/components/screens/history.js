import React, { Component } from 'react';

import {
  Text,
} from 'react-native';

import BaseScreen from './_base';

export default class RestaurantHistory extends BaseScreen {
  static navigationOptions = {
    headerTitle: 'Inspection History',
  }

  render () {
    return (
      <Text>INSPECTION HISTORY</Text>
    );
  }
}
