import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import AppNavigator from './src/router';
import { database } from './src/database';
import * as Font from 'expo-font';
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

    database.initDatabase();

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