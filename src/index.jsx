import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function index() {
  return (
    <View style={styles.container}>
      <App />
      <StatusBar />
    </View>
  );
}

export default registerRootComponent(index);
