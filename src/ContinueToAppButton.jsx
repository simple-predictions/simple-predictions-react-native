import React, { useState, useEffect } from 'react';
import {
  Platform,
  UIManager,
  LayoutAnimation,
  Animated,
  StyleSheet,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContinueToAppButton = ({ activeDotIndex, onPress }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    if (activeDotIndex === 2) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  });

  const styles = StyleSheet.create({
    continueToAppButton: {
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
      backgroundColor: 'black',
      marginBottom: 50,
      borderRadius: 20,
      padding: 10,
      zIndex: 99,
    },
  });

  return (
    <Animated.View style={styles.continueToAppButton}>
      {expanded && <Button onPress={() => { onPress(false); AsyncStorage.setItem('@alreadyLaunched', 'true'); }} color="#defc5f" title="Continue to app" />}
    </Animated.View>
  );
};

ContinueToAppButton.propTypes = {
  activeDotIndex: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ContinueToAppButton;
