import React, { Component } from 'react';
import { ActionSheetIOS } from 'react-native';

export default class ActionSheetOrModal extends Component {

  present() {
    const {
      options,
      cancelButtonIndex,
      onOptionSelected,
    } = this.props;

    ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    }, onOptionSelected);
  }

  render() {
    return null;
  }
}
