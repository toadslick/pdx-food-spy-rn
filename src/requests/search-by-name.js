import APIRequest from './api-request';
import SearchResult from '../models/search-result';
import filterSearchResults from '../utils/filter-search-results';
import mockResponse from '../mocks/search-results';

export default class SearchByName extends APIRequest {
  mock = mockResponse;

  buildQueryParams(query) {
    return {
      restaurant_name: String(query).trim(),
      since: '2014-01-01',
      limit: 50,
    };
  }

  deserialize(object) {
    return SearchResult.fromJSON(object);
  }

  postflight(results) {
    return filterSearchResults(results);
  }
}
