import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Body, Icon } from 'native-base';
import HeaderTitle from '../../components/HeaderTitle';
import FooterTabs from '../../components/FooterTabs';
import { database } from '../../database';
import Styles from '../../styles';

const styles = StyleSheet.create({
  favouriteWrapper: {
    backgroundColor: Styles.colors.midnight,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  favouriteHeader: {
    color: Styles.colors.lightMarengo,
    fontSize: 18,
    marginTop: 10,
    paddingBottom: 10,
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
    color: Styles.colors.pearl,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    color: Styles.colors.pearl,
  },
})

class Favourites extends Component {
  constructor() {
    super();

    this.state = {
      favourites: [],
    };
  }

  componentDidMount() {
    this.getAllFavourites();
  }

  getAllFavourites = async () => {
    const data = await database.getFavouritesCryptocurrencies();
    this.setState({ favourites: data });
  }

  removeFromFavourite(item) {
    database.removeFavourite(item);
    this.getAllFavourites();
  }
  
  renderFavourites() {
    const { favourites } = this.state;
    return favourites.map((e, idx) => {
      return (
        <Card key={idx}>
          <CardItem style={styles.headerDark}>
            <Body>
              <View style={styles.row}>
                <Text style={[styles.columnLight, {textAlign: 'left'}]}>{e.name}</Text>
                <Text style={styles.columnLight}>{parseFloat(e.priceUsd).toFixed(2)} USD</Text>
                <Text style={styles.columnLight}>{parseFloat(e.changePercent24Hr).toFixed(2)}%</Text>
                <TouchableOpacity style={styles.iconWrapper} onPress={() => this.removeFromFavourite(e)}>
                  <Icon style={styles.icon} name="delete" type="MaterialIcons"/>
                </TouchableOpacity>
              </View>
            </Body>
          </CardItem>
        </Card>
      );
    });
  }

  render() {
    return (
      <Container>
        <HeaderTitle backBtn={false}/>
        <View style={styles.favouriteWrapper}>
          <Text style={styles.favouriteHeader}>Favourite currencies</Text>
        </View>
        <Content>
          {this.renderFavourites()}
        </Content>
        <FooterTabs/>
      </Container>
    )
  }
}

export default Favourites;