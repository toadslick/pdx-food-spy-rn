import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          onPress={() => navigation.navigate('searchResults')}
          title="Results"
        />
      ),
    };
  };

  render() {
    return (
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Go to Search Results"
          onPress={() => this.props.navigation.navigate('searchResults')}
        />
      </View>
    );
  }
}
