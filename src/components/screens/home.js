import React from 'react';

import {
  Text,
  View,
  Button,
  SegmentedControlIOS,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import searchOptions from '../../utils/search-options';
import styles from '../../styles/screens/home';
import BaseScreen from './_base';

export default class HomeScreen extends BaseScreen {
  searchSegments = [searchOptions.address, searchOptions.name];

  constructor(props) {
    super(props);
    this.state.searchSegmentIndex = 0;
  }

  searchSegmentSelected({ nativeEvent: { selectedSegmentIndex }}) {
    this.setState({ searchSegmentIndex: selectedSegmentIndex });
  }

  performSearch(search, query) {
    console.log(`Performing search. Type: "${search.title}" Query: "${query  || ''}"`);
    const promise = search.request.fetch(query).then((results) => {
      results.sort(search.initialSort.sorter);
      return results;
    });
    this.requestAndNavigate(promise, 'searchResults', 'results', {
      search: search,
    });
  }

  searchCurrentLocation() {
    this.performSearch(searchOptions.proximity);
  }

  searchQuerySubmitted({ nativeEvent: { text }}) {
    const search = this.searchSegments[this.state.searchSegmentIndex];
    this.performSearch(search, text);
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
            values={ this.searchSegments.map((option) => option.title) }
            selectedIndex={ this.state.searchSegmentIndex }
            onChange={ this.searchSegmentSelected.bind(this) }
          />
          <TextInput
            style={ styles.searchQuery }
            onSubmitEditing={ this.searchQuerySubmitted.bind(this) }
            placeholder={ this.searchSegments[this.state.searchSegmentIndex].placeholder }
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
            title={ searchOptions.proximity.placeholder }
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
