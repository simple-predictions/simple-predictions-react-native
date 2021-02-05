import React, { useRef, useState } from 'react';
import {
  Text, View, ScrollView, StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useScrollToTop } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import {
  getScoredPreds, selectScoredMatches, selectScoringStatus, selectSelectedGameweek,
} from './Scoring/scoringSlice';
import { selectColorScheme } from './ColorScheme/colorSchemeSlice';
import GameweekPicker from './GameweekPicker';
import MatchCardTeams from './MatchCardTeams';
import { selectFriendsNames } from './User/userSlice';

const Scoring = () => {
  const matches = useSelector(selectScoredMatches);
  const gameweek = useSelector(selectSelectedGameweek);
  const status = useSelector(selectScoringStatus);
  const colorScheme = useSelector(selectColorScheme);
  const friends = useSelector(selectFriendsNames);
  const ref = useRef(null);
  const [selectorDisabled, setSelectorDisabled] = useState(true);

  if (gameweek && selectorDisabled && status !== 'pending') {
    setSelectorDisabled(false);
  }

  if (status === 'pending' && !selectorDisabled) {
    setSelectorDisabled(true);
  }

  useScrollToTop(ref);

  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();

  function handleChange(value, index) {
    setSelected(index);
    dispatch(getScoredPreds([value]));
  }

  return (
    matches.length > 0 ? (
      <ScrollView style={{ backgroundColor: colorScheme.background }} ref={ref}>
        <GameweekPicker selectorDisabled={selectorDisabled} />
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Picker
            selectedValue={friends[selected]}
            onValueChange={handleChange}
            style={{ height: 100, width: 100 }}
            itemStyle={{ height: 100 }}
          >
            {friends.map((friend) => <Picker.Item key={friend} label={friend} value={friend} />)}
          </Picker>
        </View>
        <View style={{ paddingBottom: 80 }}>
          {matches.map((match) => {
            const kickOffTime = new Date(match.kick_off_time);
            return (
              <PredictionRow
                key={match._id}
                kickOffTime={kickOffTime}
                match={match}
              />
            );
          })}
        </View>
      </ScrollView>
    ) : (
      <View>
        <Text>No matches</Text>
      </View>
    )
  );
};

const PredictionRow = ({ match }) => {
  const styles = StyleSheet.create({
    matchContainer: {
      flex: 3,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 10,
      marginRight: 20,
      marginLeft: 20,
      margin: 10,
      paddingBottom: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
  });
  const month = [];
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';

  const kickOffTime = new Date(match.kick_off_time);
  const kickOffTimeStr = `${kickOffTime.getDate()} ${month[kickOffTime.getMonth()]} ${kickOffTime.getHours()}:${(`0${kickOffTime.getMinutes()}`).slice(-2)}`;

  return (
    <View style={styles.matchContainer}>
      <MatchCardTeams match={match} kickOffTimeStr={kickOffTimeStr} />
      <Text>{`${match.user_predictions[0].home_pred} - ${match.user_predictions[0].away_pred}`}</Text>
    </View>
  );
};

PredictionRow.propTypes = {
  match: PropTypes.shape({
    kick_off_time: PropTypes.string,
    user_predictions: PropTypes.arrayOf(PropTypes.shape({
      home_pred: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      away_pred: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
  }).isRequired,
};

export default Scoring;
