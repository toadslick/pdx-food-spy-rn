import { createStackNavigator } from 'react-navigation';
import Home from './screens/home';
import SearchResultsTabs from './screens/search-results-tabs';
import InspectionHistory from './screens/history';

export default createStackNavigator({
  home: {
    screen: Home,
  },
  searchResults: {
    screen: SearchResultsTabs,
  },
  history: {
    screen: InspectionHistory,
  },
}, {
  initialRouteName: 'home',
});
