import React, {
  Component,
} from 'react';

import {
  Text,
  View,
  Button,
  SegmentedControlIOS,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import SEARCH_TYPES from '../../utils/search-types';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBusy: false,
      searchTypeIndex: 0,
      searchQuery: null,
    };
  }

  searchTypeSelected(event) {
    const index = event.nativeEvent.selectedSegmentIndex;
    this.setState({ searchTypeIndex: index });
  }

  searchCurrentLocation() {
  }

  searchQueryChanged(value) {
    this.setState({ searchQuery: value });
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
          values={ SEARCH_TYPES.map((option) => option.title) }
          selectedIndex={ this.state.searchTypeIndex }
          onChange={ this.searchTypeSelected.bind(this) }
        />
        <TextInput
        style={ styles.searchQuery }
          onChangeText={ this.searchQueryChanged.bind(this) }
          value={ this.state.searchQuery }
          placeholder={ SEARCH_TYPES[this.state.searchTypeIndex].placeholder }
          editable={ !this.state.isBusy }
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
          disabled={ this.state.isBusy }
        />
        <ActivityIndicator
          style={ styles.spinner }
          size='large'
          hidesWhenStopped='true'
          animating={ this.state.isBusy }
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
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  searchQuery: {
    fontSize: 16,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    padding: 10,
    textAlign: 'center',
  },
  button: {
    margin: 15,
    fontWeight: 'bold',
  },
  spinner: {
    marginTop: 40,
  }
};
