import SearchByAddressRequest from '../requests/search-by-address';
import SearchByNameRequest from '../requests/search-by-name';

export default [
  {
    title: 'Street Address',
    placeholder: 'Enter a Portland Street Address',
    request: new SearchByAddressRequest(),
  },
  {
    title: 'Restaurant Name',
    placeholder: 'Enter a Restaurant Name',
    request: new SearchByNameRequest(),
  },
];
