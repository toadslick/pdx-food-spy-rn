export default function(results) {
  let filteredResultsByID = {};

  results.forEach(function(result) {

    // Keep only results with a type of `FoodSvcSemi`.
    if (result.type === "FoodSvcSemi") {
      const previousResult = filteredResultsByID[result.restaurantID];

      // If this restaurant ID is already a key on the filter object,
      // replace the previous result if this result has a later inspection date.
      if (previousResult) {
        if (result.moment.isAfter(previousResult.moment)) {
          filteredResultsByID[result.restaurantID] = result;
        }

      // Add the result if this restaurant ID is not yet a key on the filtered object.
      } else {
        filteredResultsByID[result.restaurantID] = result;
      }
    }
  });

  return Object.values(filteredResultsByID);
};
