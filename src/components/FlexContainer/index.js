import React from 'react';
import { StyleSheet, View } from 'react-native';


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    flex: 1,
  },
});

const FlexContainer = props => {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  )
}

export default FlexContainer;
