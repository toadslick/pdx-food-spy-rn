import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default createAppContainer(AppNavigator);
