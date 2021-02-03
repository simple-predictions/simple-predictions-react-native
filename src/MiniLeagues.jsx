import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text, View, Button, ScrollView, StyleSheet, Dimensions,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  selectAllMinileagues,
  updateSelectedIdx,
  selectSelectedMinileagueRankings,
  selectSelectedMinileaguePreds,
  selectSelectedMinileagueName,
} from './MiniLeagues/minileaguesSlice';
import { selectColorScheme } from './ColorScheme/colorSchemeSlice';

const Stack = createStackNavigator();

const MiniLeagueRankings = () => {
  const colorScheme = useSelector(selectColorScheme);

  const styles = StyleSheet.create({
    rankingsRow: {
      flexDirection: 'row',
      backgroundColor: colorScheme.fifth,
      margin: 15,
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
      shadowColor: 'black',
      shadowOffset: { width: 2, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
    rankingsRowCol: {
      flex: 1,
      fontSize: 16,
    },
  });
  const rankings = useSelector(selectSelectedMinileagueRankings);
  const name = useSelector(selectSelectedMinileagueName);

  return (
    <ScrollView style={{ backgroundColor: colorScheme.background, minHeight: '100%', paddingTop: 10 }}>
      {rankings.length > 1 ? (
        <View>
          <View style={styles.rankingsRow}>
            <Text style={[styles.rankingsRowCol, { fontFamily: 'Montserrat-700' }]}>Position</Text>
            <Text style={[styles.rankingsRowCol, { fontFamily: 'Montserrat-700' }]}>Username</Text>
            <Text style={[styles.rankingsRowCol, { fontFamily: 'Montserrat-700' }]}>Points</Text>
          </View>
          {rankings.map((user, idx) => (
            <View style={styles.rankingsRow} key={user.username}>
              <Text style={[styles.rankingsRowCol, { fontFamily: 'Montserrat-400' }]}>{idx + 1}</Text>
              <Text style={[styles.rankingsRowCol, { fontFamily: 'Montserrat-400' }]}>{user.username}</Text>
              <Text style={[styles.rankingsRowCol, { fontFamily: 'Montserrat-400' }]}>{user.points}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={{
          justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100%',
        }}
        >
          <Text style={{
            color: colorScheme.secondary, margin: 20, textAlign: 'center', fontFamily: 'Montserrat-400', fontSize: 16,
          }}
          >
            {`Ask your friends to join your mini-league - name: ${name}`}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const MiniLeagueTable = () => {
  const table = useSelector(selectSelectedMinileaguePreds);
  const name = useSelector(selectSelectedMinileagueName);
  const colorScheme = useSelector(selectColorScheme);

  const styles = StyleSheet.create({
    scoringCircle: {
      width: 30,
      height: 30,
      borderRadius: 50,
      position: 'absolute',
      zIndex: -1,
      right: 0,
    },
  });

  return (
    <ScrollView style={{ backgroundColor: colorScheme.background, flex: 1, marginBottom: 70 }}>
      {table.members.length > 1 ? table.matches.map((match) => (
        <View
          style={{
            backgroundColor: colorScheme.fifth, margin: 20, padding: 10, borderRadius: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5,
          }}
          key={match._id}
        >
          <Text style={{ textAlign: 'center' }}>{`${match.home_team} vs ${match.away_team}`}</Text>
          <View style={{
            backgroundColor: '#323232', alignSelf: 'center', padding: 5, borderRadius: 50, margin: 5,
          }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>{match.live_home_score !== undefined && `${match.live_home_score} - ${match.live_away_score}`}</Text>
          </View>
          {table.members.map((member) => {
            let pred = match.predictions.find(
              (obj) => obj.username === member.username,
            );
            if (pred) { if (pred.home_pred === null) { pred = null; } }
            let backgroundColor;
            if (pred) {
              if (pred.points > 0) {
                backgroundColor = 'green';
              } else if (pred.points < 0) {
                backgroundColor = 'red';
              } else {
                backgroundColor = 'gray';
              }
            }
            return (
              pred ? (
                <View key={member.username} style={{ flexDirection: 'row', minHeight: 30, alignItems: 'center' }}>
                  <Text style={{ flex: 1, fontFamily: 'Montserrat-700' }}>{member.username}</Text>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ flex: 1 }}>{pred.error_message ? pred.error_message : `${pred.home_pred}-${pred.away_pred}` }</Text>
                    <View style={{ width: 30, justifyContent: 'center', flexDirection: 'row' }}>
                      <Text>{pred.points}</Text>
                    </View>
                  </View>
                  <View style={[styles.scoringCircle, { backgroundColor }]} />
                </View>
              ) : (
                <View key={member.username} style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, fontFamily: 'Montserrat-700' }}>{member.username}</Text>
                  <Text style={{ flex: 1 }}>No prediction</Text>
                </View>
              )
            );
          })}
        </View>
      )) : (
        <View style={{
          justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100%',
        }}
        >
          <Text style={{
            color: colorScheme.secondary, margin: 20, textAlign: 'center', fontFamily: 'Montserrat-400', fontSize: 16,
          }}
          >
            {`Ask your friends to join your mini-league - name: ${name}`}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const SingleMiniLeague = () => {
  const Tab = createMaterialTopTabNavigator();
  const colorScheme = useSelector(selectColorScheme);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator tabBarOptions={{ style: { backgroundColor: colorScheme.background }, activeTintColor: colorScheme.secondary }} initialLayout={{ width: Dimensions.get('window').width }}>
        <Tab.Screen name="Rankings" component={MiniLeagueRankings} />
        <Tab.Screen name="Table" component={MiniLeagueTable} />
      </Tab.Navigator>
    </View>
  );
};

const MiniLeagueSelector = ({ navigation }) => {
  const dispatch = useDispatch();
  const minileagues = useSelector(selectAllMinileagues);
  const colorScheme = useSelector(selectColorScheme);

  return (
    <View style={{ height: '100%' }}>
      <View style={{
        justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 30,
      }}
      >
        <Text style={{ fontFamily: 'Montserrat-400', fontSize: 25 }}>Mini-leagues</Text>
      </View>
      <View style={{
        flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 100, padding: 20, backgroundColor: colorScheme.background, borderWidth: 0,
      }}
      >
        {minileagues.map((minileague, idx) => (
          <View
            key={minileague._id}
            style={{
              backgroundColor: '#c4c4c4', width: '100%', marginTop: 20, borderRadius: 15, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5,
            }}
          >
            <Button color="black" title={minileague.name} onPress={() => { navigation.navigate('SinglePage', { idx, name: minileague.name }); dispatch(updateSelectedIdx(idx)); }} />
          </View>
        ))}
      </View>
    </View>
  );
};

MiniLeagueSelector.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const MiniLeagues = () => {
  const colorScheme = useSelector(selectColorScheme);

  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false, headerTintColor: colorScheme.secondary, headerStyle: { backgroundColor: colorScheme.background, borderWidth: 0 } }} name="Mini Leagues List" component={MiniLeagueSelector} />
      <Stack.Screen
        options={({ route }) => ({
          title: route.params.name,
          headerTintColor: colorScheme.secondary,
          headerStyle: { backgroundColor: colorScheme.background, borderColor: 'transparent' },
          headerBackTitle: 'Back',
        })}
        name="SinglePage"
        component={SingleMiniLeague}
        screen
      />
    </Stack.Navigator>
  );
};

export default MiniLeagues;
