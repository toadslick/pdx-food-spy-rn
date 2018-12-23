import SearchByAddress from './search-by-address';

import CONFIG from '../config';
import mockPosition from '../mocks/current-location';

export default class SearchByCurrentLocationRequest extends SearchByAddress {

  preflight() {
    // Allow mocking of the current location.
    if (CONFIG.mockRequests) {
      console.log('MOCKING geolocation.');
      return Promise.resolve(mockPosition);
    }

    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(position) {
        resolve(position);
      }, function() {
        reject('Your current location could not be determined.');
      });
    });
  }

  buildURL({ coords: { latitude, longitude }}) {
    return `${CONFIG.apiRootURL}near/${longitude},${latitude}`;
  }
}
