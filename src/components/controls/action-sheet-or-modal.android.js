import React, { Component } from 'react';

import {
  Modal,
  Button,
  View,
  TouchableNativeFeedback,
} from 'react-native';

import styles from '../../styles/action-sheet-or-modal';

export default class ActionSheetOrModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    }
  }

  optionSelected(index) {
    const { onOptionSelected } = this.props;
    this.setState({ isVisible: false });
    if (onOptionSelected) {
      onOptionSelected(index);
    }
  }

  present() {
    this.setState({ isVisible: true });
  }

  dismiss() {
    this.setState({ isVisible: false });
  }

  render() {
    return (
      <Modal
        animationType='fade'
        visible={ this.state.isVisible }
        transparent={ true }
        onRequestClose={ () => {} }
      >
        <TouchableNativeFeedback onPress={ this.dismiss.bind(this) }>
          <View style={ styles.container }>
            <View style={ styles.modal }>
              { this.renderOptions() }
            </View>
          </View>
        </TouchableNativeFeedback>
      </Modal>
    );
  }

  renderOptions() {
    const {
      options,
      cancelButtonIndex,
    } = this.props;

    return options.map((opt, index) => {
      let style, color;
      if (index == cancelButtonIndex) {
        style = styles.cancelButton;
        color = '#999';
      } else {
        style = styles.optionButton;
        color = null;
      }

      return (
        <View
          style={ style }
          key={ index }
        >
          <Button
            title={ opt }
            onPress={ this.optionSelected.bind(this, index) }
            color={ color }
          />
        </View>
      );
    });
  }
}
