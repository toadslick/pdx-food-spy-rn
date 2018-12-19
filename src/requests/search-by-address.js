import Geocoder from 'react-native-geocoder';
import APIRequest from './api-request';
import SearchResult from '../models/search-result';
import filterSearchResults from '../utils/filter-search-results';
import mockResponse from '../mocks/search-results';
import CONFIG from '../config';

export default class SearchByAddress extends APIRequest {
  mock = mockResponse;

  preflight(streetAddress) {
    // Allow mocking of the geocoded address.
    if (CONFIG.mockRequests) {
      console.log('MOCKING geocoded address.');
      return Promise.resolve([{ position: { lat: 0, lng: 0 }}]);
    }

    console.log(`Geocoding address: "${streetAddress}"`);
    return Geocoder.geocodeAddress(`${streetAddress}, Portland OR`);
  }

  buildURL([{ position: { lat, lng }}]) {
    return `${this.rootURL}near/${lng},${lat}`;
  }

  buildQueryParams() {
    return {
      since: '2014-01-01',
      limit: 50,
      distance: 0.25,
    };
  }

  deserialize(object) {
    return SearchResult.fromJSON(object);
  }

  postflight(results) {
    return filterSearchResults(results);
  }
}
