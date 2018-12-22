import { createStackNavigator } from 'react-navigation';
import Home from './screens/home';
import SearchResultsTabs from './screens/search-results-tabs';
import InspectionHistory from './screens/inspection-history';
import InspectionDetails from './screens/inspection-details';

export default createStackNavigator({
  home: {
    screen: Home,
  },
  searchResults: {
    screen: SearchResultsTabs,
  },
  history: {
    screen: InspectionHistory,
    navigationOptions: {
      title: 'Inspection History',
    },
  },
  details: {
    screen: InspectionDetails,
    navigationOptions: {
      title: 'Inspection Details',
    },
  },
}, {
  initialRouteName: 'home',
});
