import APIRequest from './api-request';
import SearchResult from '../models/search-result';
import mockResponse from '../mocks/restaurant-history';

export default class InspectionHistoryRequest extends APIRequest {
  mock = mockResponse;

  buildQueryParams(query) {
    return {
      restaurant_id: String(query).trim(),
    };
  }

  deserialize(object) {
    return SearchResult.fromJSON(object);
  }

  postflight(results) {
    return results.filter(function(result) {
      return result.score > 0;
    });
  }
}
