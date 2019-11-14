import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Card, CardItem, Body } from 'native-base';
import HeaderTitle from '../../components/HeaderTitle';
import FooterTabs from '../../components/FooterTabs';
import { database } from '../../database';


class Favourites extends Component {
  renderFavourites= async () => {
    const data = await database.getFavouritesCryptocurrencies();
    return data.map(e => {
      <View>
        <Text>{e.name}</Text>
        <Text>{e.priceUsd}</Text>
        <Text>{e.changePercent24Hr}</Text>
      </View>
    })
  }

  render() {
    return (
      <Container>
        <HeaderTitle backBtn={false}/>
        <Card>
          <CardItem>
            <Body>
              <View>
                {this.renderFavourites()}
              </View>
            </Body>
          </CardItem>
        </Card>
        <FooterTabs />
      </Container>
    )
  }
}

export default Favourites;