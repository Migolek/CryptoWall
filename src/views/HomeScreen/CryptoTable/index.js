import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Container, Card, CardItem, Body, Icon } from 'native-base';
import { database } from '../../../database';
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  columnLight: {
    flex: 3,
    position: 'relative',
    textAlign: 'center',
    color: Styles.colors.midnight,
    fontSize: 16,
  },
  columnDark: {
    flex: 3,
    position: 'relative',
    textAlign: 'center',
    color: Styles.colors.pearl,
    fontSize: 16,
  },
  iconWrapper: {
    zIndex: 10,
    position: 'relative',
    flex: 1,
  },
  icon: {
    color: Styles.colors.midnight,
    fontSize: 28,
  },
  favouriteIcon: {
    color: Styles.colors.gold,
    fontSize: 28,
  },
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
    navigation.navigate('DetailsScreen', { id: id })
  }

  addToFavourite = (currency) => {
    const { favourites } = this.props;
    const isFavourite = favourites.map(e => e.id).includes(currency.id);
    !isFavourite ? database.addFavourite(currency) : null;
    this.props.reloadData();
  }

  checkColumStyle = idx => idx % 2 == 0 ? styles.columnDark : styles.columnLight;

  checkIsFavourite = id => {
    const { favourites } = this.props;
    const isFavourite = favourites.map(e => e.id).includes(id);
    return isFavourite ? styles.favouriteIcon : styles.icon;
  }

  renderTable = () => {
    const { cryptoCurrencies } = this.props;
    return cryptoCurrencies && cryptoCurrencies.map((e, idx) => {
      return (
        <Card key={idx}>
          <CardItem button style={idx % 2 == 0 ? styles.headerDark : styles.headerLight} onPress={() => this.navigateToDetails(e.id)}>
            <Body>
              <View style={styles.row}>
                <Text style={[this.checkColumStyle(idx), {textAlign: 'left'}]}>{e.name}</Text>
                <Text style={this.checkColumStyle(idx)}>{parseFloat(e.priceUsd).toFixed(2)} USD</Text>
                <Text style={this.checkColumStyle(idx)}>{parseFloat(e.changePercent24Hr).toFixed(2)}%</Text>
                <TouchableOpacity style={styles.iconWrapper} onPress={() => this.addToFavourite(e)}>
                  <Icon style={this.checkIsFavourite(e.id)} name="star"/>
                  {/* <Icon name="star"/> */}
                </TouchableOpacity>
              </View>
            </Body>
          </CardItem>
        </Card>
      );
    })
  }

  render() {
    const { cryptoCurrencies, isFetching, fetchData } = this.props;

    if(cryptoCurrencies && !cryptoCurrencies.length) return <Container><Loader /></Container>

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