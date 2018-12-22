const options = {
  name: {
    title: 'Sort by Name',
    allow: () => true,
    sort: (results) => {
      return results;
    },
  },
  score: {
    title: 'Sort by Score',
    allow: () => true,
    sort: (results) => {
      return results;
    },
  },
  distance: {
    title: 'Sort by Distance',
    allow: (search) => search.allowProximitySort,
    sort: (results) => {
      return results;
    },
  },
  cancel: {
    title: 'Cancel',
    allow: () => true,
    sort: (results) => results,
  },
};

const orderedOptions = [
  options.name,
  options.score,
  options.distance,
  options.cancel,
];

function allowedOptions(search) {
  return orderedOptions.filter((option) => {
    return option.allow(search);
  });
};

export default options;
export { allowedOptions as allowedSortOptions };
