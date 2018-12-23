import APIRequest from './api-request';
import SearchResult from '../models/search-result';
import filterSearchResults from '../utils/filter-search-results';
import mockResponse from '../mocks/search-results';
import CONFIG from '../config';

export default class SearchByNameRequest extends APIRequest {
  mock = mockResponse;

  buildQueryParams(query) {
    return {
      restaurant_name: String(query).trim(),
      since: CONFIG.searchSinceDate,
      limit: CONFIG.searchResultLimit,
    };
  }

  deserialize(object) {
    return SearchResult.fromJSON(object);
  }

  postflight(results) {
    return filterSearchResults(results);
  }
}
