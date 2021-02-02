import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Appearance } from 'react-native';
import {} from 'react-native-appearance';
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
import { getMinileagues } from './MiniLeagues/minileaguesSlice';
import { getScoredPreds } from './Scoring/scoringSlice';
import { setColorScheme } from './ColorScheme/colorSchemeSlice';
import { darkColorScheme, lightColorScheme } from './globals';

const App = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);

  if (loggedIn) {
    dispatch(getPredictions());
    dispatch(getMinileagues());
    dispatch(getScoredPreds([]));
  } else {
    dispatch(getUserInfo());
  }

  const [firstOpenVisible, setFirstOpenVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    'ShareTechMono-400': ShareTechMono_400Regular,
    'Montserrat-400': Montserrat_400Regular,
    'Montserrat-700': Montserrat_700Bold,
  });

  const handleDarkModeUpdate = (preferences) => {
    const { colorScheme } = preferences;
    if (colorScheme === 'dark') {
      dispatch(setColorScheme(darkColorScheme));
    } else {
      // render some light thing
      dispatch(setColorScheme(lightColorScheme));
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('@alreadyLaunched').then((value) => {
      if (value === null) {
        setFirstOpenVisible(true);
      }
    });
    handleDarkModeUpdate({ colorScheme: Appearance.getColorScheme() });
  }, []);

  Appearance.addChangeListener(handleDarkModeUpdate);

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
