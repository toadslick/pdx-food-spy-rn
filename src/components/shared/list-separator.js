import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../../styles/navigable-list';

export default class ListSeparator extends Component {
  render() {
    return (
      <View style={ styles.separator }/>
    );
  }
}
