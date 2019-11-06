import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Container, Card, CardItem, Body } from 'native-base';
import Loader from '../../../components/Loader';
import Styles from '../../../styles';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Styles.colors.marengo,
  },
  row: {
    flexDirection: 'row',

  },
  column: {
    flex: 3,
    textAlign: 'center',
    color: Styles.colors.pearl,
    fontSize: 14,
  }
});

class CryptoTable extends PureComponent {
  static propTypes = {
    selectedSort: PropTypes.string,
    types: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      cryptoCurrencies: [],
      isFetching: false,
    };
  }

  componentDidMount() {
    this.fetchCryptoCurrency();
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.types != this.props.types)) {
      this.sortData();
      console.log('log')
    }
  }
  
  sortData = () => {
    const { selectedSort, types } = this.props;
    const { cryptoCurrencies } = this.state;

    switch (types[selectedSort]) {
      case 'asc':
        return selectedSort == 'name' 
          ? this.setState({cryptoCurrencies: cryptoCurrencies.sort((a,b)=> a[selectedSort].toLowerCase() < b[selectedSort].toLowerCase()) })
          : this.setState({cryptoCurrencies: cryptoCurrencies.sort((a,b)=> a[selectedSort] - b[selectedSort]) });
      case 'desc' : 
        return selectedSort == 'name' 
        ? this.setState({cryptoCurrencies: cryptoCurrencies.sort((a,b)=> b[selectedSort].toLowerCase() > a[selectedSort].toLowerCase()) })
        : this.setState({cryptoCurrencies: cryptoCurrencies.sort((a,b)=> b[selectedSort] - a[selectedSort]) });
      default:
        break;
    }
  }

  fetchCryptoCurrency = async () => {
    this.setState({ isFetching: true });
    await fetch(`http://api.coincap.io/v2/assets`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru,en;q=0.9',
      },
    })
      .then(response => response.json())
      .then(responseJson => this.setState({ cryptoCurrencies: responseJson.data, isFetching: false }));
  } 

  renderTable = () => {
    const { cryptoCurrencies } = this.state;
    console.log('render')
    return cryptoCurrencies.map((e, idx) => {
      return (
        <Card key={idx}>
          <CardItem style={styles.header}>
            <Body>
              <View style={styles.row}>
                <Text style={[styles.column, {textAlign: 'left'}]}>{e.name}</Text>
                <Text style={styles.column}>{parseFloat(e.priceUsd).toFixed(2)} USD</Text>
                <Text style={styles.column}>{parseFloat(e.changePercent24Hr).toFixed(2)}%</Text>
              </View>
            </Body>
          </CardItem>
        </Card>
      );
    })
  }
  

  render() {
    const { cryptoCurrencies, isFetching } = this.state;

    if(!cryptoCurrencies.length) return <Container><Loader /></Container>

    return (
      <ScrollView 
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={this.fetchCryptoCurrency} />}>
        {this.renderTable()}
      </ScrollView>
    )
  }
}

export default CryptoTable;