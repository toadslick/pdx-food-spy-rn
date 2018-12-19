import CONFIG from '../config';

export default class APIRequest {
  rootURL = 'http://api.civicapps.org/restaurant-inspections/';
  mock = {};

  // Used to handle async behavior needed before the request, such as geocoding.
  preflight(query) { return Promise.resolve(query); }

  // Build the request URL from the given query.
  buildURL(query) { return this.rootURL; }

  // Build the request query parameters from the given query.
  buildQueryParams(query) { return {}; }

  // Deserialize each result object returned by a successful response.
  deserialize(object) { return object; }

  // Handle any post-processing, such as filtering or ordering, of the deserialized result.
  postflight(results) { return results; }

  fetch(query) {
    return this.preflight(query).then(this.request.bind(this));
  }

  request(query) {
    let url = this.buildURL(query);
    const params = this.buildQueryParams(query);

    const queryString = Object.keys(params).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');

    if (queryString) {
      url = `${url}?${queryString}`;
    }

    // Allow mocking of the API response.
    let promise;
    if (CONFIG.mockRequests) {
      console.log('MOCKING response from API request.');
      promise = Promise.resolve(this.mock);
    } else {
      console.log('Sending API request. URL:', url);
      promise = fetch(url, params).then((response) => response.json());
    }

    return promise.then(this.parseJSON.bind(this));
  }

  parseJSON(json) {
    console.log(`API response received. JSON:`, json);

    // The Civic Apps API will only include a `results` key
    // if the request succeeded and did not return an empty set.
    const results = json['results'];
    if (results) {
      let deserializedResults;

      // If results is an array, deserialize each item in the array.
      if (results.length >= 0) {
        console.log('Deserialize JSON array:', results);
        deserializedResults = results.map(this.deserialize);

      // If `results` is not an array, deserialize the entire object.
      } else {
        console.log('Deserialize JSON object:', results);
        deserializedResults = this.deserialize(results);
      }

      // Last but not least, pass the results through the postflight function.
      const postflightResults = this.postflight(deserializedResults);
      console.log('Postflight results:', postflightResults);
      return postflightResults;

    // Throw an exception on an empty set of results.
    } else {
      throw 'No results were found.';
    }
  }
}
