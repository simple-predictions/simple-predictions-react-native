import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectColorScheme } from './ColorScheme/colorSchemeSlice';
import { getPredictions, selectUserPredictionsGameweek } from './Predictions/predictionsSlice';

const GameweekPicker = ({ selectorDisabled }) => {
  const styles = StyleSheet.create({
    arrowButtonDisabled: {
      backgroundColor: 'transparent',
    },
    gameweekText: {
      fontFamily: 'Montserrat-400',
      fontSize: 25,
    },
  });

  const dispatch = useDispatch();
  const colorScheme = useSelector(selectColorScheme);
  const gameweek = useSelector(selectUserPredictionsGameweek);

  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 10,
    }}
    >
      <Icon color={selectorDisabled ? 'gray' : colorScheme.secondary} disabledStyle={styles.arrowButtonDisabled} name="arrow-left" size={50} disabled={!!selectorDisabled} onPress={() => dispatch(getPredictions(gameweek - 1))} />
      <Text style={[styles.gameweekText, { color: selectorDisabled ? 'gray' : colorScheme.secondary }]}>{`Gameweek ${gameweek}`}</Text>
      <Icon color={selectorDisabled ? 'gray' : colorScheme.secondary} disabledStyle={styles.arrowButtonDisabled} name="arrow-right" size={50} disabled={!!selectorDisabled} onPress={() => dispatch(getPredictions(gameweek + 1))} />
    </View>
  );
};

GameweekPicker.propTypes = {
  selectorDisabled: PropTypes.bool.isRequired,
};

export default GameweekPicker;
