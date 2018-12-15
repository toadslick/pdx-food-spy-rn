import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/home';
import SearchResultsScreen from './screens/search-results';

export default createStackNavigator({
  home: {
    screen: HomeScreen,
  },
  searchResults: {
    screen: SearchResultsScreen,
  },
}, {
  initialRouteName: 'home',
});
