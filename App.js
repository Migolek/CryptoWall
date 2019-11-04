import React from 'react';
import AppNavigator from './src/router';
import * as Font from 'expo-font';
import { View } from 'react-native';
import FlexContainer from './src/components/FlexContainer';
import Loader from './src/components/Loader';

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

    return fontLoaded ? <AppNavigator /> 
    : <FlexContainer>
        <Loader />
      </FlexContainer>;
  }
}

export default function App() {
  return (<AppWrapper />);
};