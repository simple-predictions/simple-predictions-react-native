import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectScoredMatches } from './Scoring/scoringSlice';

const Scoring = () => {
  const matches = useSelector(selectScoredMatches);
  return (
    matches.length > 0 ? (
      <View>
        <Text>Scoring</Text>
      </View>
    ) : (
      <View>
        <Text>No matches</Text>
      </View>
    )
  );
};

export default Scoring;
