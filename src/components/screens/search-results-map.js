import React, { Component } from 'react';

import {
  Text,
  View,
  ActivityIndicator,
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
  rhr = new InspectionHistoryRequest();

  constructor(props) {
    super(props);
    this.state.results = props.navigation.getParam('results');
  }

  componentDidMount() {
    this.fitToMarkers();
  }

  willFocus() {
    this.props.navigation.dangerouslyGetParent().setParams({
      activeTabScreen: this,
    });
  }

  headerRightButtonPressed() {
    this.fitToMarkers();
  }

  calloutTapped(item) {
    const promise = this.rhr.fetch(item.restaurantID);
    return this.requestAndNavigate(promise, 'history', 'history');
  }

  fitToMarkers() {
    console.log('Fitting map to search results.')
    const markerIdentifiers = this.state.results.map(result => result.key);
    this.mapView.fitToSuppliedMarkers(markerIdentifiers);
  }

  render() {
    const overlayStyle = {};
    if (!this.state.isBusy) {
      overlayStyle.display = 'none';
    }

    return (
      <View style={ mapStyles.container }>
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
        <View style={ [mapStyles.busyOverlay, overlayStyle] }>
          <View style= { mapStyles.spinnerContainer }>
            <ActivityIndicator
              size='large'
              hidesWhenStopped
              animating={ this.state.isBusy }
              color='#000'
            />
          </View>
        </View>
      </View>
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
