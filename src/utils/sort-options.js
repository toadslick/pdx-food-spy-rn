const options = {
  name: {
    title: 'Sort by Name',
    allow: () => true,
    sorter: (a, b) => {
      const an = a.name.toUpperCase();
      const bn = b.name.toUpperCase();
      return an.localeCompare(bn);
    },
  },
  score: {
    title: 'Sort by Score',
    allow: () => true,
    sorter: (a, b) => {
      if (a.score < b.score) { return  1; }
      if (a.score > b.score) { return -1; }
      return 0;
    },
  },
  distance: {
    title: 'Sort by Distance',
    allow: (search) => search.allowProximitySort,
    sorter: (a, b) => {
      if (a.distance > b.distance) { return  1; }
      if (a.distance < b.distance) { return -1; }
      return 0;
    },
  },
  cancel: {
    title: 'Cancel',
    allow: () => true,
    sorter: () => 0,
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
