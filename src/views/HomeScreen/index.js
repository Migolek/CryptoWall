import React from 'react';
import { Button, StyleSheet,StatusBar, Platform } from 'react-native';
import { Container, Header, Content } from 'native-base';
import HeaderTitle from '../../components/HeaderTitle';
import FooterTabs from '../../components/FooterTabs';
import Styles from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.colors.pearl,
  }, 
});

class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <HeaderTitle />
        <Content>
          <Button
            title="Go to Jane's profile"
            // onPress={() => navigate('Profile', {name: 'Jane'})}
            onPress={() => console.log('test')}
          />
        </Content>
        <FooterTabs />
      </Container>
    );
  }
}

export default HomeScreen;