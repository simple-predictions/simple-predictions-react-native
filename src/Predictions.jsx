import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  Button,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { useScrollToTop } from '@react-navigation/native';
import Badges from './ImageLoader';
import handleSubmit from './Logic/PredictionsLogic';
import {
  selectUserPredictions, selectUserPredictionsGameweek, selectUserPredictionsStatus, getPredictions,
} from './Predictions/predictionsSlice';
import Dollar from '../assets/dollar.png';
import Padlock from '../assets/padlock.png';
import { selectColorScheme } from './ColorScheme/colorSchemeSlice';

const Predictions = () => {
  const userPredictions = useSelector(selectUserPredictions);
  const gameweek = useSelector(selectUserPredictionsGameweek);
  const status = useSelector(selectUserPredictionsStatus);
  const [successCount, setSuccessCount] = useState(0);
  const [selectorDisabled, setSelectorDisabled] = useState(true);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState();
  const dispatch = useDispatch();
  const colorScheme = useSelector(selectColorScheme);

  const [formData, setFormData] = useState([]);

  const ref = useRef(null);

  useScrollToTop(ref);

  useEffect(() => {
    const userPredsSimple = userPredictions.map((match) => (
      {
        home_pred: match.user_predictions[0].home_pred,
        away_pred: match.user_predictions[0].away_pred,
        game_id: match._id,
        banker: match.user_predictions[0].banker || false,
        insurance: match.user_predictions[0].insurance || false,
      }
    ));
    setFormData(userPredsSimple);
  }, [userPredictions]);

  const updateFormData = (matchID, team, score) => {
    const newData = [...formData];
    const idx = formData.findIndex((match) => matchID === match.game_id);
    if (team === 'banker') {
      newData[idx].banker = score;
    } else if (team === 'insurance') {
      newData[idx].insurance = score;
    } else {
      newData[idx][`${team}_pred`] = score;
    }
    setFormData(newData);
  };

  if (gameweek && selectorDisabled && status !== 'pending') {
    setSelectorDisabled(false);
  }

  if (status === 'pending' && !selectorDisabled) {
    setSelectorDisabled(true);
  }

  const styles = StyleSheet.create({
    arrowButtonDisabled: {
      backgroundColor: 'transparent',
    },
    gameweekText: {
      fontFamily: 'Montserrat-400',
      fontSize: 25,
    },
  });

  return (
    <ScrollView style={{ backgroundColor: colorScheme.background }} ref={ref}>
      { successMessage && (
      <Text
        style={{
          color: '#721c24', borderColor: '#f5c6cb', backgroundColor: '#f8d7da', padding: 10, margin: 10,
        }}
        onClose={() => setSuccessMessage('')}
      >
        {`${successMessage} - `}
          {`${successCount} attempt(s)`}
      </Text>
      )}
      {/* <DropdownSelector
        enabled={selectorDisabled}
        length={38}
        onValueUpdate={(e) => dispatch(getPredictions(e.target.value))}
        startingValue={gameweek}
      /> */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 10,
      }}
      >
        <Icon color={selectorDisabled ? 'gray' : colorScheme.secondary} disabledStyle={styles.arrowButtonDisabled} name="arrow-left" size={50} disabled={!!selectorDisabled} onPress={() => dispatch(getPredictions(gameweek - 1))} />
        <Text style={[styles.gameweekText, { color: selectorDisabled ? 'gray' : colorScheme.secondary }]}>{`Gameweek ${gameweek}`}</Text>
        <Icon color={selectorDisabled ? 'gray' : colorScheme.secondary} disabledStyle={styles.arrowButtonDisabled} name="arrow-right" size={50} disabled={!!selectorDisabled} onPress={() => dispatch(getPredictions(gameweek + 1))} />
      </View>
      <View style={{ paddingBottom: 80 }}>
        {userPredictions.map((match) => {
          const kickOffTime = new Date(match.kick_off_time);
          return (
            <PredictionRow
              updateFormData={updateFormData}
              key={match._id}
              kickOffTime={kickOffTime}
              match={match}
            />
          );
        })}
        <Button title="Submit" disabled={!submitEnabled} onPress={() => handleSubmit(formData, setSubmitEnabled, setSuccessMessage, successCount, setSuccessCount)} className="predictions-form-submit-button predictions-form-submit-button-mobile" type="submit" value="Submit" form="predictions-form" />
      </View>
    </ScrollView>
  );
};

const PredictionRow = ({ kickOffTime, match, updateFormData }) => {
  const colorScheme = useSelector(selectColorScheme);
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

  const styles = StyleSheet.create({
    predInput: {
      height: 30,
      width: 30,
      textAlign: 'center',
      borderColor: 'transparent',
      borderWidth: 1,
      borderRadius: 10,
      margin: 5,
      fontSize: (18),
      backgroundColor: '#C5D6CF',
    },
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

  const [bankerEnabled, setBankerEnabled] = useState(!!match.user_predictions[0].banker);
  const [insuranceEnabled, setInsuranceEnabled] = useState(!!match.user_predictions[0].insurance);
  const [homePred, setHomePred] = useState(Number.isInteger(parseInt(match.user_predictions[0].home_pred, 10)) ? match.user_predictions[0].home_pred.toString() : '');
  const [awayPred, setAwayPred] = useState(Number.isInteger(parseInt(match.user_predictions[0].away_pred, 10)) ? match.user_predictions[0].away_pred.toString() : '');
  const kickOffTimeStr = `${kickOffTime.getDate()} ${month[kickOffTime.getMonth()]} ${kickOffTime.getHours()}:${(`0${kickOffTime.getMinutes()}`).slice(-2)}`;
  return (
    <View style={styles.matchContainer}>
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
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 1, justifyContent: match.locked ? 'center' : 'flex-end', flexDirection: 'row' }}>
            {/* -underscore-dangle */}
            <View style={{ flexDirection: 'row', backgroundColor: '#e8e8e8', borderRadius: 10 }}>
              {!match.locked && (
              <TouchableWithoutFeedback
                onPress={() => { setHomePred((parseInt(homePred, 10) - 1 || 0).toString()); updateFormData(match._id, 'home', (parseInt(homePred, 10) - 1 || 0).toString()); }}
              >
                <View style={{
                  backgroundColor: '#6e6e6e', margin: 5, width: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10,
                }}
                >
                  <Text style={{ fontSize: 20, color: 'white' }}>-</Text>
                </View>
              </TouchableWithoutFeedback>
              )}
              <TextInput style={[styles.predInput, { backgroundColor: match.locked ? '#C5D6CF' : 'white' }]} keyboardType="number-pad" editable={!match.locked} value={homePred} onChangeText={(text) => { setHomePred(text); updateFormData(match._id, 'home', text); }} />
              {!match.locked && (
              <TouchableWithoutFeedback
                onPress={() => { setHomePred((parseInt(homePred, 10) + 1 || 0).toString()); updateFormData(match._id, 'home', (parseInt(homePred, 10) + 1 || 0).toString()); }}
              >
                <View style={{
                  backgroundColor: '#6e6e6e', margin: 5, width: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10,
                }}
                >
                  <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
                </View>
              </TouchableWithoutFeedback>
              )}
            </View>
          </View>
          <View style={{
            flexDirection: 'row', justifyContent: 'center', marginBottom: 10, marginTop: 5, marginLeft: 5, marginRight: 5,
          }}
          >
            {/* -underscore-dangle */}
            {(!match.locked || (match.locked && bankerEnabled)) && (
            <TouchableHighlight disabled={!!match.locked} type="button" style={{ opacity: bankerEnabled ? 1 : 0.3, height: 30, width: 30 }} onPress={() => { updateFormData(match._id, 'banker', !bankerEnabled); setBankerEnabled(!bankerEnabled); }}>
              <Image style={{ height: 30, width: 30 }} source={Dollar} />
            </TouchableHighlight>
            )}
            {/* -underscore-dangle */}
            {(!match.locked || (match.locked && insuranceEnabled)) && (
            <TouchableHighlight disabled={!!match.locked} type="button" style={{ opacity: insuranceEnabled ? 1 : 0.3, height: 30, width: 30 }} onPress={() => { updateFormData(match._id, 'insurance', !insuranceEnabled); setInsuranceEnabled(!insuranceEnabled); }}>
              <Image style={{ height: 30, width: 30 }} source={Padlock} />
            </TouchableHighlight>
            )}
          </View>

          <View style={{ flex: 1, justifyContent: match.locked ? 'center' : 'flex-start', flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#e8e8e8', borderRadius: 10 }}>
              {!match.locked && (
              <TouchableWithoutFeedback
                onPress={() => { setAwayPred((parseInt(awayPred, 10) - 1 || 0).toString()); updateFormData(match._id, 'away', (parseInt(awayPred, 10) - 1 || 0).toString()); }}
              >
                <View style={{
                  backgroundColor: '#6e6e6e', margin: 5, width: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10,
                }}
                >
                  <Text style={{ fontSize: 20, color: 'white' }}>-</Text>
                </View>
              </TouchableWithoutFeedback>
              )}
              <TextInput style={[styles.predInput, { backgroundColor: match.locked ? '#C5D6CF' : 'white' }]} keyboardType="number-pad" editable={!match.locked} value={awayPred} onChangeText={(text) => { setAwayPred(text); updateFormData(match._id, 'away', text); }} />
              {!match.locked && (
              <TouchableWithoutFeedback
                onPress={() => { setAwayPred((parseInt(awayPred, 10) + 1 || 0).toString()); updateFormData(match._id, 'away', (parseInt(awayPred, 10) + 1 || 0).toString()); }}
              >
                <View style={{
                  backgroundColor: '#6e6e6e', margin: 5, width: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10,
                }}
                >
                  <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
                </View>
              </TouchableWithoutFeedback>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

PredictionRow.propTypes = {
  kickOffTime: PropTypes.instanceOf(Date).isRequired,
  updateFormData: PropTypes.func.isRequired,
  match: PropTypes.shape({
    _id: PropTypes.string,
    home_team: PropTypes.string,
    away_team: PropTypes.string,
    locked: PropTypes.bool,
    user_predictions: PropTypes.arrayOf(PropTypes.shape({
      home_pred: PropTypes.string,
      away_pred: PropTypes.string,
      banker: PropTypes.bool,
      insurance: PropTypes.bool,
    })),
  }).isRequired,
};

export default Predictions;
