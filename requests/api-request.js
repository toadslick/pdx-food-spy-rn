export default class APIRequest {
  rootURL = 'http://api.civicapps.org/restaurant-inspections/';

  fetch(query) {
    const url = this.buildURL(query);
    console.log('FETCH:', url);
    return fetch(url).then(this.parseResponse.bind(this));
  }

  // Override me in extending classes.
  buildURL(query) {
    return rootURL;
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

    // Raise an exception on an empty set of results.
    } else {
      raise 'No results were found.';
    }
  }

  // Override me in extending classes.
  deserialize(object) {
    return object;
  }
}
