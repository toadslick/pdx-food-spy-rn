import React, { Component } from 'react';
import { Picker } from 'react-native';

export default class SegmentOrPicker extends Component {

  optionSelected(value, index) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(index);
    }
  }

  render() {
    const {
      values,
      selectedIndex,
      style,
    } = this.props;

    const options = values.map((value, index) => {
      return (
        <Picker.Item
          label={ value }
          value={ index }
          key={ index }
        />
      );
    });

    return (
      <Picker
        selectedValue={ selectedIndex }
        onValueChange={ this.optionSelected.bind(this) }
        style={ style }
      >
        { options }
      </Picker>
    );
  }
}
