import React, { Component } from 'react';

import {
  Text,
  View,
} from 'react-native';

import MapView, {
  Marker,
  Callout,
} from 'react-native-maps';

import styles from '../../styles/screens/search-results-map';

export default class SearchResultsMap extends Component {
  static navigationOptions = {
    tabBarLabel: 'Map',
  };

  constructor(props) {
    super(props);
    this.state = {
      results: props.navigation.getParam('results'),
    };
  }

  componentDidMount() {
    this.fitToMarkers();
  }

  fitToMarkers() {
    const markerIdentifiers = this.state.results.map(result => result.inspectionID);
    this.mapView.fitToSuppliedMarkers(markerIdentifiers);
  }

  render() {
    return (
      <MapView
        mapType='mutedStandard'
        showsPointsOfInterest={ false }
        showsBuildings={ false }
        showsTraffic={ false }
        showsIndoors={ false }
        toolbarEnabled={ false }
        showsUserLocation={ true }
        style={ styles.map }
        ref={ (c) => this.mapView = c }
      >
        { this.renderMapMarkers() }
      </MapView>
    );
  }

  renderMapMarkers() {
    return this.state.results.map(function(result) {
      const coordinate = {
        latitude: result.latitude,
        longitude: result.longitude,
      };
      return (
        <Marker
          coordinate={ coordinate }
          title={ result.name }
          description={ result.address }
          key={ result.key }
          identifier={ result.key }
          pinColor={ result.scoreColor }
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
