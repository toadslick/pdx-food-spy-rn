import SearchByAddress from '../requests/search-by-address';
import SearchByName from '../requests/search-by-name';

export default [
  {
    title: 'Street Address',
    placeholder: 'Enter a Portland Street Address',
    request: new SearchByAddress(),
  },
  {
    title: 'Restaurant Name',
    placeholder: 'Enter a Restaurant Name',
    request: new SearchByName(),
  },
];
