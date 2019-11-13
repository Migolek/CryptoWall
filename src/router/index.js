import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Styles from '../styles';

import HomeScreen from '../views/HomeScreen';
import CryptoCurrencyDetails from '../views/CryptoCurrencyDetails';
import Author from '../views/Author';

const MainNavigator = createStackNavigator(
  {
    HomeScreen: {screen: HomeScreen},
    DetailsScreen: {screen: CryptoCurrencyDetails},
    Author: {screen: Author},
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {
      headerTintColor: Styles.colors.pearl,
      headerStyle: {
        backgroundColor: Styles.colors.midnight,
      },
    },
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  },
);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;