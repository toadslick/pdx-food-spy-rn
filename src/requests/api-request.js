export default class APIRequest {
  rootURL = 'http://api.civicapps.org/restaurant-inspections/';

  // Used to handle async behavior needed before the request, such as geocoding.
  preflight(query) { return Promise.resolve(query); }

  // Build the request URL from the given query.
  buildURL(query) { return rootURL; }

  // Build the request query parameters from the given query.
  buildQueryParams(query) { return {}; }

  // Deserialize each result object returned by a successful response.
  deserialize(object) { return object; }

  fetch(query) {
    return this.preflight(query).then(this.request.bind(this));
  }

  request(query) {
    const url = this.buildURL(query);
    const params = this.buildQueryParams(query);
    return fetch(url, params).then(this.parseResponse.bind(this));
  }

  parseResponse(response) {
    // The Civic Apps API will only include a `results` key
    // if the request succeeded and did not return an empty set.
    const results = response.json()['results'];
    if (results) {

      // If `results` is not an array, deserialize the entire object.
      if (results.length >= 0) {
        return this.deserialize(results);

      // If results is an array, deserialize each item in the array.
      } else {
        return results.map(this.deserialize);
      }

    // Throw an exception on an empty set of results.
    } else {
      throw 'No results were found.';
    }
  }
}
