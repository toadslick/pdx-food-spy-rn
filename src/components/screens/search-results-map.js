import React, { Component } from 'react';

import {
  Text,
  View,
  ActivityIndicator,
  Platform,
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
  request = new InspectionHistoryRequest();

  constructor(props) {
    super(props);
    this.state.results = props.navigation.getParam('results');
  }

  willFocus() {
    this.props.navigation.dangerouslyGetParent().setParams({
      activeTabScreen: this,
    });
  }

  headerRightButtonPressed() {
    this.fitToMarkers(true);
  }

  calloutTapped(item) {
    const promise = this.request.fetch(item.restaurantID);
    return this.requestAndNavigate(promise, 'history', 'history');
  }

  fitToMarkers(isAnimated) {
    console.log('Fitting map to search results.')
    const markerIdentifiers = this.state.results.map(result => result.key);
    this.mapView.fitToSuppliedMarkers(markerIdentifiers, {
      edgePadding: { top: 100, left: 20, right: 20, bottom: 5, },
      animated: isAnimated,
    });
  }

  render() {
    const overlayStyles = [mapStyles.busyOverlay];
    if (this.state.isBusy) {
      overlayStyles.push(mapStyles.visibleBusyOverlay);
    }

    const mapType = Platform.select({
      android: 'standard',
      ios: 'mutedStandard',
    });

    return (
      <View style={ mapStyles.container }>
        <MapView
          mapType={ mapType }
          showsPointsOfInterest={ false }
          showsBuildings={ false }
          showsTraffic={ false }
          showsIndoors={ false }
          toolbarEnabled={ false }
          showsUserLocation={ true }
          style={ mapStyles.map }
          ref={ (c) => this.mapView = c }
          onMapReady={ this.fitToMarkers.bind(this, false) }
        >
          { this.renderMapMarkers() }
        </MapView>
        <View style={ overlayStyles }>
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
          onMapReady
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
