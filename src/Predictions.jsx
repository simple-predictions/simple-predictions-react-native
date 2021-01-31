import React, { useEffect, useState } from 'react';
import {
  Text, TouchableHighlight, View, Button, TextInput, Image, ScrollView, StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import Badges from './ImageLoader';
import handleSubmit from './Logic/PredictionsLogic';
import {
  selectUserPredictions, selectUserPredictionsGameweek, selectUserPredictionsStatus, getPredictions,
} from './Predictions/predictionsSlice';
import Dollar from '../assets/dollar.png';
import Padlock from '../assets/padlock.png';

const Predictions = () => {
  const userPredictions = useSelector(selectUserPredictions);
  const gameweek = useSelector(selectUserPredictionsGameweek);
  const status = useSelector(selectUserPredictionsStatus);
  const [successCount, setSuccessCount] = useState(0);
  const [selectorDisabled, setSelectorDisabled] = useState(true);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const userPredsSimple = userPredictions.map((match) => (
      {
        home_pred: match.user_predictions[0].home_pred,
        away_pred: match.user_predictions[0].away_pred,
        // eslint-disable-next-line no-underscore-dangle
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
      fontSize: 20,
    },
  });

  return (
    <ScrollView style={{ backgroundColor: '#323232' }}>
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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Icon color={selectorDisabled ? 'gray' : 'white'} disabledStyle={styles.arrowButtonDisabled} name="arrow-left" size={50} disabled={!!selectorDisabled} onPress={() => dispatch(getPredictions(gameweek - 1))} />
        <Text style={[styles.gameweekText, { color: selectorDisabled ? 'gray' : 'white' }]}>{`Gameweek ${gameweek}`}</Text>
        <Icon color={selectorDisabled ? 'gray' : 'white'} disabledStyle={styles.arrowButtonDisabled} name="arrow-right" size={50} disabled={!!selectorDisabled} onPress={() => dispatch(getPredictions(gameweek + 1))} />
      </View>
      <View className="col-lg-8 right-col">
        {userPredictions.map((match) => {
          const kickOffTime = new Date(match.kick_off_time);
          return (
            <PredictionRow
              updateFormData={updateFormData}
              // eslint-disable-next-line no-underscore-dangle
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
      height: (40),
      width: (40),
      textAlign: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      margin: 5,
      fontSize: (18),
      backgroundColor: 'white',
    },
    predictionCircle: {
      width: 70,
      height: 70,
      borderRadius: 50,
      backgroundColor: '#defc5f',
      position: 'absolute',
      zIndex: -1,
    },
    scoreContainer: {
      flex: 3,
      justifyContent: 'center',
      backgroundColor: '#defc5f',
      borderRadius: 10,
      marginRight: 10,
      marginLeft: 10,
    },
  });

  const [bankerEnabled, setBankerEnabled] = useState(!!match.user_predictions[0].banker);
  const [insuranceEnabled, setInsuranceEnabled] = useState(!!match.user_predictions[0].insurance);
  const [homePred, setHomePred] = useState((parseInt(match.user_predictions[0].home_pred, 10) || '').toString());
  const [awayPred, setAwayPred] = useState((parseInt(match.user_predictions[0].away_pred, 10) || '').toString());

  return (
    // eslint-disable-next-line no-underscore-dangle
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }} className="outer-container" key={match._id}>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }} className="home-team-container">
        <Image alt="home club badge" className="club-badge" style={{ height: 50, width: 50, resizeMode: 'contain' }} source={Badges[match.home_team.replace(/\s+/g, '')]} />
        <View style={styles.predictionCircle} />
      </View>
      <View style={styles.scoreContainer}>
        <View style={{ marginTop: 10 }}>
          <Text style={{ textAlign: 'center', fontSize: 14 }}>
            {kickOffTime.getDate()}
            {' '}
            {month[kickOffTime.getMonth()]}
            {' '}
            {kickOffTime.getHours()}
            :
            {(`0${kickOffTime.getMinutes()}`).slice(-2)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {/* eslint-disable-next-line no-underscore-dangle */}
          <TextInput style={[styles.predInput, { backgroundColor: match.locked ? '#C5D6CF' : 'white' }]} keyboardType="number-pad" editable={!match.locked} value={homePred} onChangeText={(text) => { setHomePred(text); updateFormData(match._id, 'home', text); }} />
          <Text>-</Text>
          {/* eslint-disable-next-line no-underscore-dangle */}
          <TextInput style={[styles.predInput, { backgroundColor: match.locked ? '#C5D6CF' : 'white' }]} keyboardType="number-pad" editable={!match.locked} value={awayPred} onChangeText={(text) => { setAwayPred(text); updateFormData(match._id, 'away', text); }} />
        </View>
        <View style={{
          flexDirection: 'row', justifyContent: 'center', marginBottom: 10, marginTop: 5,
        }}
        >
          {/* eslint-disable-next-line no-underscore-dangle */}
          <TouchableHighlight disabled={!!match.locked} type="button" style={{ opacity: bankerEnabled ? 1 : 0.3, height: 30, width: 30 }} onPress={() => { updateFormData(match._id, 'banker', !bankerEnabled); setBankerEnabled(!bankerEnabled); }}>
            <Image style={{ height: 30, width: 30 }} source={Dollar} />
          </TouchableHighlight>
          {/* eslint-disable-next-line no-underscore-dangle */}
          <TouchableHighlight disabled={!!match.locked} type="button" style={{ opacity: insuranceEnabled ? 1 : 0.3, height: 30, width: 30 }} onPress={() => { updateFormData(match._id, 'insurance', !insuranceEnabled); setInsuranceEnabled(!insuranceEnabled); }}>
            <Image style={{ height: 30, width: 30 }} source={Padlock} />
          </TouchableHighlight>
        </View>
      </View>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }} className="away-team-container">
        <Image alt="away club badge" className="club-badge" style={{ height: 50, width: 50, resizeMode: 'contain' }} source={Badges[match.away_team.replace(/\s+/g, '')]} />
        <View style={styles.predictionCircle} />
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
