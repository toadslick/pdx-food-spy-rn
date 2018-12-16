import React, { Component } from 'react';
import { Text, View, Button, SegmentedControlIOS } from 'react-native';

const SEARCH_TYPES = {
  'Street Address': {},
  'Restaurant Name': {},
};

const SEARCH_TYPE_KEYS = Object.keys(SEARCH_TYPES);

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTypeIndex: 0,
    };
  }

  searchTypeSelected(event) {
    const index = event.nativeEvent.selectedSegmentIndex;
    this.setState({ searchTypeIndex: index });
    console.log('SEARCH TYPE SELECTED:', SEARCH_TYPE_KEYS[index]);
  }

  searchCurrentLocation() {
    console.log('SEARCH CURRENT LOCATION');
  }

  render() {
    return (
      <View>
        <Text>
          Find Inspections for Portland Restaurants
          </Text>
        <Text>
          Search by:
        </Text>
        <SegmentedControlIOS
          values={ SEARCH_TYPE_KEYS }
          selectedIndex={ this.state.searchTypeIndex }
          onChange={ this.searchTypeSelected.bind(this) }
        />
        <Text>
          or...
        </Text>
        <Button
          title='Near My Current Location'
          onPress={ this.searchCurrentLocation.bind(this) }
        />
      </View>
    );
  }
}
