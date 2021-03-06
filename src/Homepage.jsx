import React, { useState, useRef } from 'react';
import {
  Text, View, Button, ScrollView, Image, StyleSheet, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { selectAllMinileaguesUserPosition } from './MiniLeagues/minileaguesSlice';
import { selectUserTotalPoints, selectUserUsername } from './User/userSlice';
import { selectFeatureMatches } from './Scoring/scoringSlice';
import { selectColorScheme } from './ColorScheme/colorSchemeSlice';
import Badges from './ImageLoader';
import Live from '../assets/live.png';
import Dollar from '../assets/dollar.png';
import Padlock from '../assets/padlock.png';

const FeatureMatch = ({ match, name }) => {
  const [userPredStr, setUserPredStr] = useState(`${match.user_predictions[0].home_pred}:${match.user_predictions[0].away_pred}`);

  const styles = StyleSheet.create({
    teamBackgroundCircle: {
      position: 'absolute',
      width: 80,
      height: 80,
      top: -10,
      left: -10,
      borderRadius: 100 / 2,
      backgroundColor: '#E4E3E5',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
  });
  const colorScheme = useSelector(selectColorScheme);

  return (
    <View
      key={match._id}
      style={{
        backgroundColor: colorScheme.fourth, marginTop: 10, marginBottom: 10, padding: 10, paddingTop: 40, borderRadius: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5, alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View>
            <View style={styles.teamBackgroundCircle} />
            <Image style={{ height: 60, width: 60, resizeMode: 'contain' }} source={Badges[match.home_team.replace(/\s/g, '')]} />
          </View>
          <Text style={{
            color: colorScheme.secondary, fontSize: 15, padding: 10, flex: 1, textAlign: 'center', marginTop: 10, fontFamily: 'Montserrat-400',
          }}
          >
            {match.home_team}
          </Text>
        </View>
        {match.user_predictions[0].banker
        && <Image style={{ height: 30, width: 30 }} source={Dollar} />}
        {match.user_predictions[0].insurance
        && <Image style={{ height: 30, width: 30 }} source={Padlock} />}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View>
            <View style={styles.teamBackgroundCircle} />
            <Image style={{ height: 60, width: 60, resizeMode: 'contain' }} source={Badges[match.away_team.replace(/\s/g, '')]} />
          </View>
          <Text style={{
            color: colorScheme.secondary, fontSize: 15, padding: 10, flex: 1, textAlign: 'center', marginTop: 10, fontFamily: 'Montserrat-400',
          }}
          >
            {match.away_team}
          </Text>
        </View>
      </View>
      {name === 'Live Matches' && (
      <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 10 }}>
        <View style={{
          flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#E4E3E5', paddingTop: 10, paddingBottom: 10, marginLeft: 20, marginRight: 20, borderRadius: 50, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
        }}
        >
          <View style={{ flex: 1 }}>
            <View style={{
              // eslint-disable-next-line no-nested-ternary
              borderRadius: 50, position: 'absolute', height: 35, width: 35, backgroundColor: match.user_predictions[0].points > 0 ? 'green' : match.user_predictions[0].points == null || match.user_predictions[0].points === 0 ? 'gray' : 'red', left: 12, top: -6,
            }}
            />
            <Text style={{ fontSize: 18, textAlign: 'center' }}>{match.user_predictions[0].points || 0}</Text>
          </View>
          <Text style={{
            textAlign: 'left', letterSpacing: 3, fontSize: 18, flex: 1,
          }}
          >
            {`${match.user_predictions[0].home_pred}:${match.user_predictions[0].away_pred}`}
          </Text>
        </View>
        <View style={{
          flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#E4E3E5', paddingTop: 10, paddingBottom: 10, marginLeft: 20, marginRight: 20, borderRadius: 50, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
        }}
        >
          <Image style={{ height: 30, resizeMode: 'contain', flex: 1 }} source={Live} />
          <Text style={{ letterSpacing: 3, fontSize: 18, flex: 1 }}>{`${match.live_home_score}:${match.live_away_score}`}</Text>
        </View>
      </View>
      )}
      {name.includes('Upcoming games:') && (
      <View style={{
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10,
      }}
      >
        <View style={{ flex: 1 }} />
        <Pressable
          style={{
            flexDirection: 'row', justifyContent: 'center', flex: 2, backgroundColor: '#E4E3E5', paddingTop: 10, paddingBottom: 10, marginLeft: 20, marginRight: 20, borderRadius: 50, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
          }}
          delay={1000}
          onLongPress={() => setUserPredStr('Your prediction')}
          onPressOut={() => setTimeout(() => setUserPredStr(`${match.user_predictions[0].home_pred}:${match.user_predictions[0].away_pred}`), 1000)}
        >
          <View>
            <Text style={{ textAlign: 'center', letterSpacing: 3, fontSize: 18 }}>{userPredStr}</Text>
          </View>
        </Pressable>
        <View style={{ flex: 1 }} />
      </View>
      )}
    </View>
  );
};

FeatureMatch.propTypes = {
  name: PropTypes.string.isRequired,
  match: PropTypes.shape({
    user_predictions: PropTypes.arrayOf(PropTypes.shape({
      home_pred: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      away_pred: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      points: PropTypes.number,
      banker: PropTypes.bool,
      insurance: PropTypes.bool,
    })),
    home_team: PropTypes.string,
    away_team: PropTypes.string,
    live_home_score: PropTypes.number,
    live_away_score: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

const Homepage = () => {
  const username = useSelector(selectUserUsername);
  const points = useSelector(selectUserTotalPoints);
  const minileagues = useSelector(selectAllMinileaguesUserPosition);
  const featureMatches = useSelector(selectFeatureMatches);
  const navigation = useNavigation();
  const colorScheme = useSelector(selectColorScheme);
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        flex: 1, backgroundColor: colorScheme.background,
      }}
    >
      <View style={{ paddingRight: 20, paddingLeft: 20, paddingTop: 30 }}>
        <Text style={{ color: colorScheme.secondary, fontFamily: 'Montserrat-400', fontSize: 25 }}>Good morning,</Text>
        <Text style={{ color: colorScheme.secondary, fontFamily: 'Montserrat-700', fontSize: 30 }}>{username.charAt(0).toUpperCase() + username.slice(1)}</Text>
      </View>
      <View style={{ marginTop: 20, paddingRight: 20, paddingLeft: 20 }}>
        <Text>
          <Text style={{ color: colorScheme.secondary, fontFamily: 'Montserrat-400', fontSize: 20 }}>Points: </Text>
          <Text style={{ color: colorScheme.secondary, fontFamily: 'Montserrat-700', fontSize: 20 }}>{points}</Text>
        </Text>
      </View>
      {featureMatches && (
      <View style={{ margin: 20 }}>
        <Text style={{
          color: colorScheme.secondary, fontFamily: 'Montserrat-700', fontSize: 25, marginBottom: 10,
        }}
        >
          {featureMatches.name}
        </Text>
        <View style={{
          backgroundColor: colorScheme.third, paddingTop: 10, paddingBottom: 10, borderRadius: 15,
        }}
        >
          {featureMatches.matches.map((match) => (
            <FeatureMatch key={match._id} name={featureMatches.name} match={match} />
          ))}
        </View>
      </View>
      )}
      <View style={{ marginBottom: 70 }}>
        <Text style={{
          color: colorScheme.secondary, fontFamily: 'Montserrat-700', fontSize: 25, marginTop: 15, marginBottom: 15, paddingRight: 20, paddingLeft: 20,
        }}
        >
          Mini-leagues
        </Text>
        {minileagues.map((minileague) => (
          <View
            key={minileague.name}
            style={{
              backgroundColor: colorScheme.third,
              marginRight: 20,
              marginLeft: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 15,
            }}
          >
            <Text style={{
              color: colorScheme.secondary, fontFamily: 'Montserrat-400', fontSize: 25, marginBottom: 10,
            }}
            >
              {minileague.name}
            </Text>
            {minileague.arr.map((user) => (
              <View
                key={user.username}
                style={{
                  flexDirection: 'row', backgroundColor: colorScheme.fourth, marginTop: 10, marginBottom: 10, padding: 10, borderRadius: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5,
                }}
              >
                <Text style={{
                  color: colorScheme.secondary, flex: 1, fontSize: 16,
                }}
                >
                  {user.position}
                </Text>
                <Text style={{
                  color: colorScheme.secondary, flex: 1, fontSize: 16,
                }}
                >
                  {user.username}
                </Text>
                <Text style={{
                  color: colorScheme.secondary, flex: 1, fontSize: 16,
                }}
                >
                  {user.points}
                </Text>
              </View>
            ))}
            <View>
              <Button title="View more..." color={colorScheme.secondary} onPress={() => navigation.navigate('Mini Leagues', { screen: 'SinglePage', params: { name: minileague.name } })} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Homepage;
