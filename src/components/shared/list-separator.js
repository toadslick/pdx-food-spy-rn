import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../../styles/list-item';

export default class ListSeparator extends Component {
  render() {
    return (
      <View style={ styles.separator }/>
    );
  }
}
