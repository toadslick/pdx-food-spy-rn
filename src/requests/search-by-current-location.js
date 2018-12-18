import SearchByAddress from './search-by-address';

export default class SearchByCurrentLocation extends SearchByAddress {

  preflight() {
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
