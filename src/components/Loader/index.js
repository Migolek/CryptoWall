import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base'; 

const styles = StyleSheet.create({
  loaderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loader = () => {
  debugger;
  return (
    <View style={styles.loaderContainer}>
      <Spinner color='blue' />
    </View>
  )
}

export default Loader;

