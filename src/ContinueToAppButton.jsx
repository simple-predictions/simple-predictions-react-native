import React, { useState, useEffect } from 'react';
import { Platform, UIManager, LayoutAnimation, Animated, StyleSheet, Button } from 'react-native';

const ContinueToAppButton = ({ activeDotIndex }) => {
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
      {expanded && <Button color="#defc5f" title="Continue to app" />}
    </Animated.View>
  );
};

export default ContinueToAppButton;
