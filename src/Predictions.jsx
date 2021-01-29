import React, { useEffect, useState } from 'react';
import { Text, TouchableHighlight, View, Button, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Badges from './ImageLoader';
import handleSubmit from './Logic/PredictionsLogic';
import { selectUserPredictions, selectUserPredictionsGameweek, selectUserPredictionsStatus } from './Predictions/predictionsSlice';

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
        game_id: match._id,
      }
    ));
    setFormData(userPredsSimple);
  }, []);

  const updateFormData = (matchID, team, score) => {
    const newData = [...formData];
    const idx = formData.findIndex((match) => matchID === match.game_id);
    newData[idx][`${team}_pred`] = score;
    setFormData(newData);
    console.log(formData[idx])
  }


  if (gameweek && selectorDisabled && status !== 'pending') {
    setSelectorDisabled(false);
  }

  if (status === 'pending' && !selectorDisabled) {
    setSelectorDisabled(true);
  }

  return (
    <ScrollView className="m-0 row">
      {/* successMessage && (
      <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
        {`${successMessage} - `}
        <strong>
          {`${successCount} attempt(s)`}
        </strong>
      </Alert>
      ) */}
      {/* <DropdownSelector
        enabled={selectorDisabled}
        length={38}
        onValueUpdate={(e) => dispatch(getPredictions(e.target.value))}
        startingValue={gameweek}
      /> */}
      <View className="col-lg-8 right-col">
        {userPredictions.map((match) => {
          const kickOffTime = new Date(match.kick_off_time);
          // eslint-disable-next-line no-underscore-dangle
          return (
            <PredictionRow
              updateFormData={updateFormData}
              key={match._id}
              kickOffTime={kickOffTime}
              match={match}
            />
          );
        })}
        <Button title="Submit" disabled={!submitEnabled} onPress={() => handleSubmit(formData)} className="predictions-form-submit-button predictions-form-submit-button-mobile" type="submit" value="Submit" form="predictions-form" />
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
      height: 50,
      width: 50,
      textAlign: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      margin: 5,
      fontSize: 20,
    },
  });

  const [bankerEnabled, setBankerEnabled] = useState(!!match.user_predictions[0].banker);
  const [insuranceEnabled, setInsuranceEnabled] = useState(!!match.user_predictions[0].insurance);
  const [homePred, setHomePred] = useState((parseInt(match.user_predictions[0].home_pred, 10) || '').toString());
  const [awayPred, setAwayPred] = useState((parseInt(match.user_predictions[0].away_pred, 10) || '').toString());

  return (
    // eslint-disable-next-line no-underscore-dangle
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }} className="outer-container" key={match._id}>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}} className="home-team-container">
        <Image alt="home club badge" className="club-badge" style={{ height: 70, width: 70 }} source={Badges[match.home_team.replace(/\s+/g, '')]} />
        <View className="prediction-circle" />
      </View>
      <View style={{flex: 3, justifyContent: 'center'}} className="score-container">
        <View className="kick-off-time-container">
          <Text style={{textAlign: 'center'}}>
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
          <TextInput style={styles.predInput} keyboardType="number-pad" disabled={!!match.locked} name={`${match._id}[home-pred]`} value={homePred} onChangeText={(text) => {setHomePred(text); updateFormData(match._id, 'home', text)}} />
          <Text>-</Text>
          {/* eslint-disable-next-line no-underscore-dangle */}
          <TextInput style={styles.predInput} keyboardType="number-pad" disabled={!!match.locked} name={`${match._id}[away-pred]`} value={awayPred} onChangeText={(text) => {setAwayPred(text); updateFormData(match._id, 'away', text)}} />
        </View>
        <View className="chips-container">
          <TouchableHighlight disabled={!!match.locked} type="button" style={{ opacity: bankerEnabled ? 1 : 0.3 }} className="chip-icon-button" onClick={() => setBankerEnabled(!bankerEnabled)}>
          {/* <Image className="chip-icon" alt="dollar icon" src="/icons/dollar.png" height={30} /> */}
          <Text>TEST1</Text>
          </TouchableHighlight>
          {/* eslint-disable-next-line no-underscore-dangle */}
          <TouchableHighlight disabled={!!match.locked} type="button" style={{ opacity: insuranceEnabled ? 1 : 0.3 }} className="chip-icon-button" onClick={() => setInsuranceEnabled(!insuranceEnabled)}>
          {/* <Image className="chip-icon" alt="padlock icon" src="/icons/padlock.png" height={30} /> */}
          <Text>TEST2</Text>
          </TouchableHighlight>
          {/* eslint-disable-next-line no-underscore-dangle */}
        </View>
      </View>
      <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}} className="away-team-container">
        <Image alt="away club badge" className="club-badge" style={{height:70, width: 70}} source={Badges[match.away_team.replace(/\s+/g, '')]} />
        <View className="prediction-circle" />
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
