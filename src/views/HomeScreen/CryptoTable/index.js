import React, { Component } from 'react';
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

  renderTable = () => {
    const { cryptoCurrencies, navigation } = this.props;
    return cryptoCurrencies.map((e, idx) => {
      return (
        <Card key={idx}>
          <CardItem button style={styles.header} onPress={() => this.navigateToDetails(e.id)}>
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