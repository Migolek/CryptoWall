import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { Header, Left, Body, Button, Icon, Title } from 'native-base';
import Styles from '../../styles';


const styles = StyleSheet.create({
  header: {
    backgroundColor: Styles.colors.midnight,
  },
  button: {
    position: 'absolute',
    left: 0
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  title: { 
    color: Styles.colors.pearl,
  },
  icon: { color: Styles.colors.pearl },
});

class HeaderTitle extends Component {
  static propTypes = {
    backBtn: PropTypes.bool,
    navigation: PropTypes.object,
  }

  render() {
    const { backBtn, navigation } = this.props;
    return (
      <Header style={styles.header}>
        {backBtn &&
          <Button transparent style={styles.button} onPress={() => navigation.goBack()}>
            <Icon style={styles.icon} name='arrow-back' />
          </Button>
        }
        <Body style={styles.body}>
          <Title style={styles.title}>Crypto Wall</Title>
        </Body>
      </Header>
    );
  }
}

export default withNavigation(HeaderTitle);