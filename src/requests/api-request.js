export default class APIRequest {
  rootURL = 'http://api.civicapps.org/restaurant-inspections/';

  // Used to handle async behavior needed before the request, such as geocoding.
  preflight(query) { return Promise.resolve(query); }

  // Build the request URL from the given query.
  buildURL(query) { return this.rootURL; }

  // Build the request query parameters from the given query.
  buildQueryParams(query) { return {}; }

  // Deserialize each result object returned by a successful response.
  deserialize(object) { return object; }

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

    console.log('Sending API request. URL:', url);
    return fetch(url, params)
      .then((response) => response.json())
      .then(this.parseJSON.bind(this));
  }

  parseJSON(json) {
    console.log(`API response received. JSON:`, json);

    // The Civic Apps API will only include a `results` key
    // if the request succeeded and did not return an empty set.
    const results = json['results'];
    if (results) {

      // If results is an array, deserialize each item in the array.
      if (results.length >= 0) {
        console.log('Deserialize JSON object:', results);
        return results.map(this.deserialize);

      // If `results` is not an array, deserialize the entire object.
      } else {
        console.log('Deserialize JSON array:', results);
        return this.deserialize(results);
      }

    // Throw an exception on an empty set of results.
    } else {
      throw 'No results were found.';
    }
  }
}
