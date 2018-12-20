import React, { Component } from 'react';

import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import styles from '../../styles/list-item';

export default class SearchResultsList extends Component {
  static navigationOptions = {
    tabBarLabel: 'List',
  };

  constructor(props) {
    super(props);
    this.state = {
      items: props.navigation.getParam('results'),
      selectedItem: null,
      isBusy: false,
    };
  }

  itemSelected(item) {
    if (!this.state.isBusy) {
      this.setState({
        selectedItem: item,
        isBusy: true,
      });
    }
  }

  render() {
    return (
      <FlatList
        data={ this.state.items }
        renderItem={ this.renderListItem.bind(this) }
        ItemSeparatorComponent={ SearchResultListSeparator }
        extraData={ this.state }
      />
    );
  }

  renderListItem({ item }) {
    let itemStyle;
    let scoreOrSpinner;

    if (this.state.selectedItem === item) {
      itemStyle = styles.activeCell;
      scoreOrSpinner = (
        <ActivityIndicator
          size='large'
          hidesWhenStopped
          animating={ this.state.isBusy }
          color='#000'
        />
      );
    } else {
      scoreOrSpinner = (
        <Text
          style={ [styles.score, { color: item.scoreColor }] }
          numberOfLines={ 1 }
        >
          { item.score }
        </Text>
      );
    }


    return (
      <TouchableHighlight
        onPress={ this.itemSelected.bind(this, item) }
      >
        <View style={ [styles.cell, itemStyle] }>
          <View style={ styles.textContainer }>
            <Text
              style={ styles.title }
              numberOfLines={ 1 }
            >
              { item.name }
            </Text>
            <Text
              style={ styles.subtitle }
              numberOfLines={ 1 }
            >
              { item.address }
            </Text>
          </View>
          <View style={ styles.scoreContainer }>
            { scoreOrSpinner }
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

class SearchResultListSeparator extends Component {
  render() {
    return (
      <View style={ styles.separator }/>
    );
  }
}
