import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './store/store';
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
  AsyncStorage.removeItem('@alreadyLaunched');
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <App />
        <StatusBar hidden />
      </View>
    </Provider>
  );
}

export default registerRootComponent(index);
