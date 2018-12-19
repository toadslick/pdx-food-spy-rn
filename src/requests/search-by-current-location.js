import SearchByAddress from './search-by-address';
import CONFIG from '../config';

export default class SearchByCurrentLocation extends SearchByAddress {

  preflight() {
    // Allow mocking of the current location.
    if (CONFIG.mockRequests) {
      console.log('MOCKING geolocation.');
      return Promise.resolve({ coords: { latitude: 0, longitude: 0 }});
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
    return `${this.rootURL}near/${longitude},${latitude}`;
  }
}
