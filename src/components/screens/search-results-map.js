import React, { Component } from 'react';

import {
  Text,
  View,
} from 'react-native';

import MapView, {
  Marker,
  Callout,
} from 'react-native-maps';

import BaseScreen from './_base';
import InspectionHistoryRequest from '../../requests/inspection-history';
import mapStyles from '../../styles/screens/search-results-map';
import calloutStyles from '../../styles/navigable-list';

export default class SearchResultsMap extends BaseScreen {
  static navigationOptions = {
    tabBarLabel: 'Map',
  };
  rhr = new InspectionHistoryRequest();

  constructor(props) {
    super(props);
    this.state.results = props.navigation.getParam('results');
  }

  componentDidMount() {
    this.fitToMarkers();
  }

  calloutTapped(item) {
    const promise = this.rhr.fetch(item.restaurantID);
    return this.requestAndNavigate(promise, 'history', 'history');
  }

  fitToMarkers() {
    const markerIdentifiers = this.state.results.map(result => result.key);
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
        style={ mapStyles.map }
        ref={ (c) => this.mapView = c }
      >
        { this.renderMapMarkers() }
      </MapView>
    );
  }

  renderMapMarkers() {
    return this.state.results.map((result) => {
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
          <Callout
            style={ mapStyles.callout }
            onPress={ this.calloutTapped.bind(this, result) }
          >
            <View style={ calloutStyles.textContainer }>
              <Text style={ calloutStyles.title }>
                { result.name }
              </Text>
              <Text style={ calloutStyles.subtitle }>
                { result.address }
              </Text>
            </View>
            <View
              style={ mapStyles.scoreContainer }
            >
              <Text
                style={ [calloutStyles.score, { color: result.scoreColor }] }>
                { result.score }
              </Text>
            </View>
          </Callout>
        </Marker>
      );
    });
  }
}
