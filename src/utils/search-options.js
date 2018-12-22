import SearchByAddressRequest from '../requests/search-by-address';
import SearchByNameRequest from '../requests/search-by-name';
import SearchByCurrentLocation from '../requests/search-by-current-location';

export default {
  address: {
    title: 'Street Address',
    placeholder: 'Enter a Portland Street Address',
    request: new SearchByAddressRequest(),
    allowProximitySort: true,
  },
  name: {
    title: 'Restaurant Name',
    placeholder: 'Enter a Restaurant Name',
    request: new SearchByNameRequest(),
    allowProximitySort: false,
  },
  proximity: {
    title: 'Current Location',
    placeholder: 'Search Near my Current Location',
    request: new SearchByCurrentLocation(),
    allowProximitySort: true,
  },
};
