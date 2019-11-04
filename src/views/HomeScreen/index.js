import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import FooterTabs from '../../components/FooterTabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },  
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <HeaderTitle />
        <Button
          title="Go to Jane's profile"
          // onPress={() => navigate('Profile', {name: 'Jane'})}
          onPress={() => console.log('test')}
        />
        <FooterTabs />
      </View>
    );
  }
}

export default HomeScreen;