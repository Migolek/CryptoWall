import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Body, List, ListItem } from 'native-base';
import HeaderTitle from '../../components/HeaderTitle';
import FooterTabs from '../../components/FooterTabs';
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
  view: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Styles.colors.pearl,
    flex: 1,
    marginBottom: 30,
  },
  list: {
    backgroundColor: Styles.colors.marengo,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
  },
  text: {
    color: Styles.colors.pearl,
    fontWeight: 'bold',
  },
});


class Author extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <HeaderTitle backBtn={true}/>
        <Content style={styles.content}>
          <Card>
            <CardItem style={styles.cardItem}>
              <Body>
                <View style={styles.view}>
                  <Text style={styles.title}>Crypto Wall</Text>
                </View>
                <View>
                  <Text style={styles.text}>Semester project which allow you watching current prices and changes of most popular crypto currencies.</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <List style={styles.list}>
              <ListItem style={styles.listItem}>
                <Text style={styles.text}>Author</Text>
                <Text style={styles.text}>Piotr Niemczyk</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
                <Text style={styles.text}>Specialization</Text>
                <Text style={styles.text}>ICT</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
                <Text style={styles.text}>Subject</Text>
                <Text style={styles.text}>"Wprowadzenie do Androida"</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
                <Text style={styles.text}>Language/Technology</Text>
                <Text style={styles.text}>React Native 0.61</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
                <Text style={styles.text}>License</Text>
                <Text style={styles.text}>MIT</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
                <Text style={styles.text}>Version</Text>
                <Text style={styles.text}>1.0</Text>
              </ListItem>
            </List>
          </Card>
        </Content>
        <FooterTabs/>
      </Container>
    )
  }
}

export default Author;