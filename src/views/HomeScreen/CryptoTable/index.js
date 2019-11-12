import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Container, Card, CardItem, Body } from 'native-base';
import Loader from '../../../components/Loader';
import Styles from '../../../styles';

const styles = StyleSheet.create({
  headerLight: {
    backgroundColor: Styles.colors.lightMarengo,
  },
  headerDark: {
    backgroundColor: Styles.colors.marengo
  },
  row: {
    flexDirection: 'row',

  },
  columnLight: {
    flex: 3,
    textAlign: 'center',
    color: Styles.colors.midnight,
    fontSize: 14,
  },
  columnDark: {
    flex: 3,
    textAlign: 'center',
    color: Styles.colors.pearl,
    fontSize: 14,
  }
});

class CryptoTable extends Component {
  static propTypes = {
    cryptoCurrencies: PropTypes.array,
    isFetching: PropTypes.bool,
    fetchData: PropTypes.func,
    navigation: PropTypes.object,
  }

  navigateToDetails = id => {
    const { navigation } = this.props;
    console.log('id')
    navigation.navigate('DetailsScreen', { id: id })
  }

  checkColumStyle = idx => idx % 2 == 0 ? styles.columnDark : styles.columnLight;

  renderTable = () => {
    const { cryptoCurrencies, navigation } = this.props;
    return cryptoCurrencies.map((e, idx) => {
      return (
        <Card key={idx}>
          <CardItem button style={idx % 2 == 0 ? styles.headerDark : styles.headerLight} onPress={() => this.navigateToDetails(e.id)}>
            <Body>
              <View style={styles.row}>
                <Text style={[this.checkColumStyle(idx), {textAlign: 'left'}]}>{e.name}</Text>
                <Text style={this.checkColumStyle(idx)}>{parseFloat(e.priceUsd).toFixed(2)} USD</Text>
                <Text style={this.checkColumStyle(idx)}>{parseFloat(e.changePercent24Hr).toFixed(2)}%</Text>
              </View>
            </Body>
          </CardItem>
        </Card>
      );
    })
  }

  render() {
    const { cryptoCurrencies, isFetching, fetchData } = this.props;

    if(!cryptoCurrencies.length) return <Container><Loader /></Container>

    return (
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={fetchData} />}>
        {this.renderTable()}
      </ScrollView>
    )
  }
}

export default CryptoTable;