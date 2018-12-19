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
import SearchByCurrentLocation from '../../requests/search-by-current-location';
import styles from '../../styles/screens/home';

const sbcl = new SearchByCurrentLocation();

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBusy: false,
      searchTypeIndex: 0,
    };
  }

  searchTypeSelected({ nativeEvent: { selectedSegmentIndex }}) {
    this.setState({ searchTypeIndex: selectedSegmentIndex });
  }

  performSearch(searchRequestPromise) {
    this.setState({ isBusy: true });
    searchRequestPromise.then((results) => {
      console.log('Search was successful. Results:', results);
      this.props.navigation.navigate('searchResults', { results });
    }, (...err) => {
      console.log('Search failed.', ...err);
    }).finally(() => {
      this.setState({ isBusy: false });
    });
  }

  searchCurrentLocation() {
    console.log('Performing search. Type: "Current Location"');
    this.performSearch(sbcl.fetch());
  }

  searchQuerySubmitted({ nativeEvent: { text }}) {
    const search = SEARCH_TYPES[this.state.searchTypeIndex];
    console.log(`Performing search. Type: "${search.title}" Query: "${text}"`);
    this.performSearch(search.request.fetch(text));
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>
          Find Inspections for Portland Restaurants
        </Text>
        <Text style={ styles.label }>
          Search by:
        </Text>
        <View style={ styles.fieldset }>
          <SegmentedControlIOS
            style={ styles.searchOptions }
            values={ SEARCH_TYPES.map((option) => option.title) }
            selectedIndex={ this.state.searchTypeIndex }
            onChange={ this.searchTypeSelected.bind(this) }
          />
          <TextInput
            style={ styles.searchQuery }
            onSubmitEditing={ this.searchQuerySubmitted.bind(this) }
            placeholder={ SEARCH_TYPES[this.state.searchTypeIndex].placeholder }
            editable={ !this.state.isBusy }
            enablesReturnKeyAutomatically
            placeholderTextColor={ styles.searchQuery.borderColor }
            autoCapitalize='none'
            autoCorrect={ false }
            selectTextOnFocus
          />
        </View>
        <Text style={ styles.label }>
          or...
        </Text>
        <View style={ styles.fieldset }>
          <Button
            style={ styles.button }
            title='Search My Current Location'
            onPress={ this.searchCurrentLocation.bind(this) }
            disabled={ this.state.isBusy }
          />
        </View>
        <ActivityIndicator
          style={ styles.spinner }
          size='large'
          hidesWhenStopped
          animating={ this.state.isBusy }
        />
      </View>
    );
  }
}
