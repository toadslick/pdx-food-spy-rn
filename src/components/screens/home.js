import React from 'react';

import {
  Text,
  View,
  Button,
  SegmentedControlIOS,
  ActivityIndicator,
  TextInput,
  Platform,
  Picker,
  SafeAreaView,
} from 'react-native';

import searchOptions from '../../utils/search-options';
import styles from '../../styles/screens/home';
import BaseScreen from './_base';
import SegmentOrPicker from '../controls/segment-or-picker';

export default class HomeScreen extends BaseScreen {
  pickerSearchOptions = [searchOptions.address, searchOptions.name];

  constructor(props) {
    super(props);
    this.state.optionIndex = 0;
  }

  optionSelected(index) {
    this.setState({ optionIndex: index });
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
    const search = this.pickerSearchOptions[this.state.optionIndex];
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
          <SegmentOrPicker
            values={ this.pickerSearchOptions.map((option) => option.title) }
            selectedIndex={ this.state.optionIndex }
            style={ styles.searchOptions }
            onChange={ this.optionSelected.bind(this) }
          />
          <TextInput
            style={ styles.searchQuery }
            onSubmitEditing={ this.searchQuerySubmitted.bind(this) }
            placeholder={ this.pickerSearchOptions[this.state.optionIndex].placeholder }
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
