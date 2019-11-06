import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base';
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
    textAlign: 'center',
    color: Styles.colors.pearl,
    fontSize: 16,
    fontWeight: 'bold',
  }, 
});

class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedSort: '',
      types: {
        name: 'asc',
        priceUsd: 'asc',
        changePercent24Hr: 'asc'
      }
    }
  }

  sortTable = type => {
    this.setState({
      selectedSort: type,
      types: {
        ...this.state.types,
        [type]: this.state.types[type] == 'asc' ? 'desc' : 'asc',
      }
    })
  }

  render() {
    const { selectedSort, types } = this.state;
    return (
      <Container style={styles.container}>
        <HeaderTitle />
        <Card>
          <CardItem style={styles.tableHeader}>
            <Body>
              <View style={styles.firstRow}>
                <Text style={[styles.firstColumn, {textAlign: 'left'}]} onPress={() => this.sortTable('name')}>Name</Text>
                <Text style={styles.firstColumn} onPress={() => this.sortTable('priceUsd')}>Price</Text>
                <Text style={styles.firstColumn} onPress={() => this.sortTable('changePercent24Hr')}>(24H)</Text>
              </View>
            </Body>
          </CardItem>
        </Card>
        <Content>
          <CryptoTable selectedSort={selectedSort} types={types}/>
        </Content>
        <FooterTabs />
      </Container>
    );
  }
}

export default HomeScreen;