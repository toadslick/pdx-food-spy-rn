import React, { Component } from 'react';
import { SegmentedControlIOS } from 'react-native';

export default class SegmentOrPicker extends Component {

  optionSelected({ nativeEvent: { selectedSegmentIndex }}) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(selectedSegmentIndex);
    }
  }

  render() {
    const {
      values,
      selectedIndex,
      style,
    } = this.props;
    
    return (
      <SegmentedControlIOS
        values={ values }
        selectedIndex={ selectedIndex }
        onChange={ this.optionSelected.bind(this) }
        style={ style }
      />
    );
  }
}
