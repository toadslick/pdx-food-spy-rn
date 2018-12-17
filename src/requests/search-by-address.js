import Geocoder from 'react-native-geocoder';
import APIRequest from './api-request';
import SearchResult from '../models/search-result';
import filterSearchResults from '../utils/filter-search-results';

export default class SearchByAddress extends APIRequest {

  preflight(streetAddress) {
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
