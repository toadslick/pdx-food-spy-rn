import SearchByLocation from '../requests/search-by-location';
import SearchByName from '../requests/search-by-name';

export default [
  {
    title: 'Street Address',
    placeholder: 'Enter a Portland Street Address',
    request: new SearchByLocation(),
  },
  {
    title: 'Restaurant Name',
    placeholder: 'Enter a Restaurant Name',
    request: new SearchByName(),
  },
];