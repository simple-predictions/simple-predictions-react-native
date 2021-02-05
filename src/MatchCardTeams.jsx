import React from 'react';
import { useSelector } from 'react-redux';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { selectColorScheme } from './ColorScheme/colorSchemeSlice';
import Badges from './ImageLoader';

const MatchCardTeams = ({ kickOffTimeStr, match }) => {
  const colorScheme = useSelector(selectColorScheme);
  const styles = StyleSheet.create({
    predictionCircle: {
      width: 80,
      height: 80,
      top: -10,
      left: -10,
      borderRadius: 50,
      position: 'absolute',
      zIndex: -1,
      backgroundColor: '#E4E3E5',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
  });

  return (
    <View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Montserrat-400' }}>
          {kickOffTimeStr}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View>
            <View style={styles.predictionCircle} />
            <Image style={{ height: 60, width: 60, resizeMode: 'contain' }} source={Badges[match.home_team.replaceAll(' ', '')]} />
          </View>
          <Text style={{
            color: colorScheme.secondary, fontSize: 15, padding: 10, flex: 1, textAlign: 'center', marginTop: 10, fontFamily: 'Montserrat-400',
          }}
          >
            {match.home_team}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View>
            <View style={styles.predictionCircle} />
            <Image style={{ height: 60, width: 60, resizeMode: 'contain' }} source={Badges[match.away_team.replaceAll(' ', '')]} />
          </View>
          <Text style={{
            color: colorScheme.secondary, fontSize: 15, padding: 10, flex: 1, textAlign: 'center', marginTop: 10, fontFamily: 'Montserrat-400',
          }}
          >
            {match.away_team}
          </Text>
        </View>
      </View>
    </View>
  );
};

MatchCardTeams.propTypes = {
  match: PropTypes.shape({
    home_team: PropTypes.string,
    away_team: PropTypes.string,
  }).isRequired,
  kickOffTimeStr: PropTypes.string.isRequired,
};

export default MatchCardTeams;
