import APIRequest from './api-request';
import SearchResult from '../models/search-result';

export default class SearchByName extends APIRequest {

  buildQueryParams(query) {
    return {
      restaurant_name: String(query).trim(),
    };
  }

  deserialize(object) {
    return SearchResult.fromJSON(object);
  }
}
