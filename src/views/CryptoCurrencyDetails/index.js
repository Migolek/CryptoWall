import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content, Card, CardItem, Body, Icon } from 'native-base';
import HeaderTitle from '../../components/HeaderTitle';
import FooterTabs from '../../components/FooterTabs';
import Loader from '../../components/Loader';
import Styles from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.colors.pearl,
  },
  content: {
    backgroundColor: Styles.colors.marengo,
  },
  cardItem: {
    backgroundColor: Styles.colors.lightMarengo,
  },
  view: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
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
    const { isFetching } = this.state;
    const { name, rank, symbol, supply, maxSupply, marketCapUsd, priceUsd, changePercent24Hr } = this.state.currencyData;

    if(isFetching) return <Container style={styles.container}><Loader /></Container>

    return (
      <Container style={styles.container}>
        <HeaderTitle backBtn={true}/>
        <Content style={styles.content}>
          <Card>
            <CardItem style={styles.cardItem}>
              <Body>
                <View style={styles.view}>
                  <Text style={styles.text}>{`${name} (${symbol})`}</Text>
                  <Text style={styles.text}>{`Rank #${rank}`}</Text>
                </View>
                <View>
                  <Text>{`Market cap ${parseFloat(marketCapUsd).toFixed(2)} USD`}</Text>
                  <Text>{`Available supply ${parseFloat(supply).toFixed(2)} USD`}</Text>
                </View>
                <View>
                  <Text>{`Max supply ${parseFloat(maxSupply).toFixed(2)} USD`}</Text>
                  <Text>{`Current price ${parseFloat(priceUsd).toFixed(2)} USD`}</Text>
                </View>
                <View>
                  <Text>{`Change price 24H ${parseFloat(changePercent24Hr).toFixed(2)} %`}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <FooterTabs/>
      </Container>
    )
  }
}

export default CryptoCurrencyDetails;
