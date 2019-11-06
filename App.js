import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView  } from 'react-native';
import { Container } from 'native-base';
import AppNavigator from './src/router';
import * as Font from 'expo-font';
import Loader from './src/components/Loader';
import Styles from './src/styles';

const styles = StyleSheet.create({
  appNavigator: {
    backgroundColor: Styles.colors.midnight,
    paddingTop: StatusBar.currentHeight,
    height: '100%',
    width: '100%',
  },  
});

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('./node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;

    return fontLoaded 
    ? <SafeAreaView style={styles.appNavigator}>
        <AppNavigator />
      </SafeAreaView> 
    : null;
  }
}

export default function App() {
  return (<AppWrapper />);
};