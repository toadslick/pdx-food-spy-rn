import SearchByAddressRequest from '../requests/search-by-address';
import SearchByNameRequest from '../requests/search-by-name';
import SearchByCurrentLocation from '../requests/search-by-current-location';

import sortOptions from './sort-options';

export default {
  address: {
    title: 'Street Address',
    placeholder: 'Enter a Portland Street Address',
    request: new SearchByAddressRequest(),
    allowProximitySort: true,
    initialSort: sortOptions.distance,
  },
  name: {
    title: 'Restaurant Name',
    placeholder: 'Enter a Restaurant Name',
    request: new SearchByNameRequest(),
    allowProximitySort: false,
    initialSort: sortOptions.name,
  },
  proximity: {
    title: 'Current Location',
    placeholder: 'Search Near my Current Location',
    request: new SearchByCurrentLocation(),
    allowProximitySort: true,
    initialSort: sortOptions.distance,
  },
};
