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
        <Text
          style={ styles.title }
        >
          Find Inspections for Portland Restaurants
          </Text>
        <Text
          style={ styles.label }
        >
          Search by:
        </Text>
        <SegmentedControlIOS
          style={ styles.searchOptions }
          values={ SEARCH_TYPE_KEYS }
          selectedIndex={ this.state.searchTypeIndex }
          onChange={ this.searchTypeSelected.bind(this) }
        />
        <Text
          style={ styles.label }
        >
          or...
        </Text>
        <Button
          style={ styles.button }
          title='Search My Current Location'
          onPress={ this.searchCurrentLocation.bind(this) }
        />
      </View>
    );
  }
}

const styles = {
  title: {
    textAlign: 'center',
    fontSize: 30,
    margin: 15,
  },
  label: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    margin: 15,
  },
  searchOptions: {
    margin: 15,
  },
  button: {
    margin: 15,
    fontWeight: 'bold',
  },
};
