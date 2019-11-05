import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Left, Body, Button, Icon, Title } from 'native-base';
import Styles from '../../styles';


const styles = StyleSheet.create({
  header: {
    backgroundColor: Styles.colors.midnight,
  },
  title: { color: Styles.colors.pearl },
  icon: { color: Styles.colors.pearl },
});

class HeaderTitle extends Component {
  render() {
    return (
      <Header style={styles.header}>
        <Left>
          <Button transparent>
            <Icon style={styles.icon} name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title style={styles.title}>Crypto Wall</Title>
        </Body>
      </Header>
    );
  }
}

export default HeaderTitle;