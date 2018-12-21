import SearchResultsList from '../components/screens/search-results-list';
import SearchResultsMap from '../components/screens/search-results-map';

export default {
	list: {
		screen: SearchResultsList,
		tabTitle: 'List',
		rightButtonTitle: 'Sort',
		image: require('../../assets/tab-icons/list.png'),
	},
	map: {
		screen: SearchResultsMap,
		tabTitle: 'Map',
		rightButtonTitle: 'Reset',
		image: require('../../assets/tab-icons/globe.png'),
	},
};
