import Geocoder from 'react-native-geocoder';
import APIRequest from './api-request';
import SearchResult from '../models/search-result';
import filterSearchResults from '../utils/filter-search-results';

import CONFIG from '../config';
import mockResponse from '../mocks/search-results';
import mockGeocode from '../mocks/address-geocode';

export default class SearchByAddressRequest extends APIRequest {
  mock = mockResponse;

  preflight(streetAddress) {
    // Allow mocking of the geocoded address.
    if (CONFIG.mockRequests) {
      console.log('MOCKING geocoded address.');
      return Promise.resolve(mockGeocode);
    }

    console.log(`Geocoding address: "${streetAddress}"`);
    return Geocoder.geocodeAddress(`${streetAddress}, Portland OR`);
  }

  buildURL([{ position: { lat, lng }}]) {
    return `${CONFIG.apiRootURL}near/${lng},${lat}`;
  }

  buildQueryParams() {
    return {
      since: CONFIG.searchSinceDate,
      limit: CONFIG.searchResultLimit,
      distance: CONFIG.searchRadius,
    };
  }

  deserialize(object) {
    return SearchResult.fromJSON(object);
  }

  postflight(results) {
    return filterSearchResults(results);
  }
}
