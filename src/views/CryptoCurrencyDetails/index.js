import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { withNavigation } from 'react-navigation';
import format from 'date-fns/format';
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
    backgroundColor: Styles.colors.marengo,
  },
  chart: {
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  view: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: {
    flex: 1,
    color: Styles.colors.pearl,
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold'
  },
  mainText: {
    color: Styles.colors.pearl,
    fontSize: 26,
  },
});

class CryptoCurrencyDetails extends Component {
  constructor() {
    super();

    this.state = {
      currencyData: {},
      currencyHistory: [],
      isFetching: false,
    }
  }

  componentDidMount() {
    this.fetchSingleCurrencyData();
    this.fetchSingleCurrencyHistory();
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
      .then(responseJson => this.setState({ currencyData: responseJson.data }));
  }

  fetchSingleCurrencyHistory = async () => {
    const currencyID = await this.props.navigation.getParam('id');
    const interval = 'h1';
    this.setState({ isFetching: true })
    await fetch(`http://api.coincap.io/v2/assets/${currencyID}/history?interval=${interval}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru,en;q=0.9',
      },
    })
      .then(response => response.json())
      .then(responseJson => this.setState({ currencyHistory: responseJson.data, isFetching: false }));
  }

  prepareDataForChart = () => {
    const { currencyHistory } = this.state;
    return currencyHistory
      .reverse()
      .map((e, idx) => idx < 12 ? e : null)
      .filter(e => e != null)
      .reverse()
      .reduce((curr, next) => {
        const date = new Date(next.date);
        return curr = {
          labels: [ ...curr.labels, format(date, 'ha')  ],
          data: [ ...curr.data, parseFloat(next.priceUsd).toFixed(4) ]
        }
      }, {
        labels: [],
        data: [],
      })
  }

  renderLineChart = () => {
    const screenWidth = Dimensions.get("window").width;
    const preparedData = this.prepareDataForChart();

    if(!preparedData.labels.length || !preparedData.data.length) return null;
    const data = {
      labels: preparedData.labels,
      datasets: [{
        data: preparedData.data,
        color: (opacity = 1) => `rgba(211, 127, 204, ${opacity})`, 
        strokeWidth: 2 
      }]
    }

    const chartConfig = {
      backgroundGradientFrom: "#697597",
      backgroundGradientFromOpacity: 1,
      backgroundGradientTo: "#697597",
      backgroundGradientToOpacity: 1,
      fillShadowGradientOpacity: 0.6,
      color: (opacity = 1) => `rgba(211, 127, 204, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 2,
      barPercentage: 0.5
    };

    return (
      <LineChart
        data={data}
        width={screenWidth - 30}
        height={256}
        verticalLabelRotation={50}
        chartConfig={chartConfig}
        bezier
      />
    );
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
                  <Text style={[styles.text, styles.mainText]}>{`${name} (${symbol})`}</Text>
                  <Text style={[styles.text, styles.mainText]}>{`Rank #${rank}`}</Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.text}>{`Market cap: ${parseFloat(marketCapUsd).toFixed(2)} USD`}</Text>
                  <Text style={styles.text}>{`Available supply: ${parseFloat(supply).toFixed(2)} USD`}</Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.text}>{`Max supply: ${parseFloat(maxSupply).toFixed(2)} USD`}</Text>
                  <Text style={styles.text}>{`Current price: ${parseFloat(priceUsd).toFixed(2)} USD`}</Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.text}>{`Change price 24H: ${parseFloat(changePercent24Hr).toFixed(2)} %`}</Text>
                </View>
              </Body>
            </CardItem>
            <CardItem style={[styles.cardItem, styles.chart]}>
              {this.renderLineChart()}
            </CardItem>
          </Card>
        </Content>
        <FooterTabs/>
      </Container>
    )
  }
}

export default withNavigation(CryptoCurrencyDetails);
