import React from 'react';
import { Button, StyleSheet, View, Text, TouchableHighlight  } from 'react-native';
import { Container, Content, Card, CardItem, Body, Icon } from 'native-base';
import HeaderTitle from '../../components/HeaderTitle';
import FooterTabs from '../../components/FooterTabs';
import CryptoTable from './CryptoTable';
import Styles from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.colors.pearl,
  },
  tableHeader: {
    backgroundColor: Styles.colors.midnight,
  },
  firstRow: {
    flexDirection: 'row',
  },
  firstColumn: {
    flex: 3,
  },
  viewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnName: {
    textAlign: 'center',
    color: Styles.colors.pearl,
    fontSize: 16,
    fontWeight: 'bold',
  },
  chevron: {
    color: Styles.colors.pearl,
  }
});

const INITIAL_TYPES = {
  name: '',
  priceUsd: '',
  changePercent24Hr: ''
}

class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      cryptoCurrencies: [],
      isFetching: false,
      types: {
        name: '',
        priceUsd: '',
        changePercent24Hr: ''
      }
    }
  }

  componentDidMount() {
    this.fetchCryptoCurrency();
  }

  sortTable = type => {
    const { cryptoCurrencies, types } = this.state;
    const sortedData = cryptoCurrencies.sort((a,b) => {
      if (types[type] == ('asc' || '')) {
        return type == 'name' 
          ? b[type].toLowerCase() > a[type].toLowerCase()
          : b[type] - a[type];
      } else {
        return type == 'name' 
          ? b[type].toLowerCase() < a[type].toLowerCase()
          : a[type] - b[type];
      }
    }); 

    this.setState({ 
      cryptoCurrencies: sortedData,
      types: {
        ...INITIAL_TYPES,
        [type]: types[type] == 'asc' || '' ? 'desc' : 'asc',
      } 
    });
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

  render() {
    const { cryptoCurrencies, isFetching, types } = this.state;
    const { name, priceUsd, changePercent24Hr } = types;

    return (
      <Container style={styles.container}>
        <HeaderTitle backBtn={false}/>
        <Card>
          <CardItem style={styles.tableHeader}>
            <Body>
              <View style={styles.firstRow}>
                <TouchableHighlight style={styles.firstColumn} onPress={() => this.sortTable('name')}>
                  <View style={styles.viewWrapper}>
                    <Text style={[styles.columnName, {textAlign: 'left'}]}>Name</Text>
                    {!!name &&
                    <Icon name={name == 'asc' ? 'chevron-up' : 'chevron-down'} type="EvilIcons" style={styles.chevron}/>
                    }
                  </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.firstColumn} onPress={() => this.sortTable('priceUsd')}>
                  <View style={styles.viewWrapper}>
                    <Text style={styles.columnName}>Price</Text>
                    {!!priceUsd &&
                    <Icon name={priceUsd == 'asc' ? 'chevron-up' : 'chevron-down'} type="EvilIcons" style={styles.chevron}/>
                    }
                  </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.firstColumn} onPress={() => this.sortTable('changePercent24Hr')}>
                  <View style={styles.viewWrapper}>
                    <Text style={styles.columnName}>(24H)</Text>
                    {!!changePercent24Hr &&
                    <Icon name={priceUsd == 'asc' ? 'chevron-up' : 'chevron-down'} type="EvilIcons" style={styles.chevron}/>
                    }
                  </View>
                </TouchableHighlight>
              </View>
            </Body>
          </CardItem>
        </Card>
        <Content>
          <CryptoTable 
            cryptoCurrencies={cryptoCurrencies} 
            isFetching={isFetching} 
            fetchData={this.fetchCryptoCurrency} 
            navigation={this.props.navigation}/>
        </Content>
        <FooterTabs />
      </Container>
    );
  }
}

export default HomeScreen;