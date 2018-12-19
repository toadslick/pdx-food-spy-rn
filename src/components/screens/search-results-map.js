import React, { Component } from 'react';

import {
  Text,
  View,
} from 'react-native';

import MapView, {
  Marker,
  Callout,
} from 'react-native-maps';

export default class SearchResultsMap extends Component {
  static navigationOptions = {
    tabBarLabel: 'Map',
  };

  render() {
    return (
      <MapView style={ styles.map }>
        { this.renderMapMarkers() }
      </MapView>
    );
  }

  renderMapMarkers() {
    const results = this.props.navigation.getParam('results');
    return results.map(function(result) {
      const coordinate = {
        latitude: result.latitude,
        longitude: result.longitude,
      };
      return (
        <Marker
          coordinate={ coordinate }
          title={ result.name }
          description={ result.address }
        >
          <Callout>
            <Text>
              { result.name }
            </Text>
            <Text>
              { result.address }
            </Text>
            <Text>
              { result.score }
            </Text>
          </Callout>
        </Marker>
      );
    });
  }
}

const styles = {
  map: {
    flex: 1,
  },
};
