import { createStackNavigator } from 'react-navigation';
import Home from './screens/home';
import SearchResultsTabs from './screens/search-results-tabs';

export default createStackNavigator({
  home: {
    screen: Home,
  },
  searchResults: {
    screen: SearchResultsTabs,
  },
}, {
  initialRouteName: 'home',
});
