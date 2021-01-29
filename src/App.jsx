import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line camelcase
import { useFonts, ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono';
// eslint-disable-next-line camelcase
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import PropTypes from 'prop-types';
import { getUserInfo, selectLoggedIn } from './User/userSlice';
import FirstOpen from './FirstOpen';
import Login from './Login';
import LoggedInNav from './LoggedInNav';
import { getPredictions } from './Predictions/predictionsSlice';

const App = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);

  if (loggedIn) {
    dispatch(getPredictions());
  } else {
    dispatch(getUserInfo());
  }

  const [firstOpenVisible, setFirstOpenVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    'ShareTechMono-400': ShareTechMono_400Regular,
    'Montserrat-400': Montserrat_400Regular,
    'Montserrat-700': Montserrat_700Bold,
  });

  useEffect(() => {
    AsyncStorage.getItem('@alreadyLaunched').then((value) => {
      if (value === null) {
        setFirstOpenVisible(true);
      }
    });
  });

  return (
    <View style={{ height: '100%', width: '100%' }}>
      {fontsLoaded
      && (firstOpenVisible
        ? <FirstOpen setFirstOpenVisible={setFirstOpenVisible} />
        : <AlreadyLaunched loggedIn={loggedIn} />)}
    </View>
  );
};

const AlreadyLaunched = ({ loggedIn }) => (
  loggedIn ? (
    <LoggedInNav />
  )
    : <Login />
);

AlreadyLaunched.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default App;
