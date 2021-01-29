import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line camelcase
import { useFonts, ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono';
// eslint-disable-next-line camelcase
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import FirstOpen from './FirstOpen';

const App = () => {
  const [firstOpenVisible, setFirstOpenVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    'ShareTechMono-400': ShareTechMono_400Regular,
    'Montserrat-400': Montserrat_400Regular,
    'Montserrat-700': Montserrat_700Bold,
  });

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value === null) {
        setFirstOpenVisible(true);
      }
    });
  });

  return (
    <View>
      {firstOpenVisible && fontsLoaded ? <FirstOpen />
        : (
          <Text>
            TestWOR
          </Text>
        )}
    </View>
  );
};

export default App;
