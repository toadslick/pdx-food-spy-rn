import APIRequest from './api-request';
import SearchResult from '../models/search-result';
import filterSearchResults from '../utils/filter-search-results';

export default class SearchByName extends APIRequest {

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
}
