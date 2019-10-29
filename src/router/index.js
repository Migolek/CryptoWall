import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../views/HomeScreen';

const MainNavigator = createStackNavigator(
  {
    HomeScreen: {screen: HomeScreen},
  },
  {
    initialRouteName: 'HomeScreen',
  }
);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;