import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Styles from '../../styles';

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Styles.colors.midnight,
  },
});

class FooterTabs extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <Footer>
        <FooterTab style={styles.footer}>
          <Button vertical onPress={() => navigation.navigate('HomeScreen')}>
            <Icon name="list" />
            <Text>Home</Text>
          </Button>
          <Button vertical onPress={() => navigation.navigate('Favourites')}>
            <Icon name="star" />
            <Text>Favourite</Text>
          </Button>
          <Button vertical onPress={() => navigation.navigate('Author')}>
            <Icon name="person" />
            <Text>Author</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default withNavigation(FooterTabs);