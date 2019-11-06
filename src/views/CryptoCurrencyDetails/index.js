import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content, Card, CardItem, Body, Icon } from 'native-base';
import HeaderTitle from '../../components/HeaderTitle';
import FooterTabs from '../../components/FooterTabs';
import Styles from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.colors.pearl,
  },
});

class CryptoCurrencyDetails extends Component {
  constructor() {
    super();

    this.state = {
      currencyData: {},
      isFetching: false,
    }
  }

  componentDidMount() {
    this.fetchSingleCurrencyData();
  }

  fetchSingleCurrencyData = async () => {
    const id = this.props.navigation.getParam('id');

    this.setState({ isFetching: true })
    await fetch(`http://api.coincap.io/v2/assets/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru,en;q=0.9',
      },
    })
      .then(response => response.json())
      .then(responseJson => this.setState({ currencyData: responseJson.data, isFetching: false }));
  }

  render() {
    console.log(this.state)
    return (
      <Container style={styles.container}>
        <HeaderTitle backBtn={true}/>
        <Content>
          <Text> textInComponent </Text>
        </Content>
        <FooterTabs/>
      </Container>
    )
  }
}

export default CryptoCurrencyDetails;
