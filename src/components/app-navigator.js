import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import Home from './screens/home';
import SearchResultsTabs from './screens/search-results-tabs';
import InspectionHistory from './screens/inspection-history';
import InspectionDetails from './screens/inspection-details';

// Hide the header bar on the home screen, since it is blank.
//
// Currently this is only applied to Android because on iOS, the home screen hops
// around when the header changes height as it transitions into the next screen.
//
// On iOS, the header bar is falsely hidden by removing its border and using the
// same background color as the home screen.
const homeScreenHeaderStyle = Platform.select({
  android: {
    height: 0,
  },
  ios: {
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 0,
  },
})

const screens = {
  home: {
    screen: Home,
    navigationOptions: {
      headerStyle: homeScreenHeaderStyle,
    },
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
};

const options = function() {
  return {
    initialRouteName: 'home',
  };
};

export default createStackNavigator(screens, options);
