import { createStackNavigator } from 'react-navigation';
import HomeScreen from './home-screen';

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});
