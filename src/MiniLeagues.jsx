import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { selectAllMinileagues, updateSelectedIdx, selectSelectedMinileagueRankings, selectSelectedMinileaguePreds, selectSelectedMinileagueName } from './MiniLeagues/minileaguesSlice';

const Stack = createStackNavigator();

const MiniLeagueRankings = () => {
  const styles = StyleSheet.create({
    rankingsRow: {
      flexDirection: 'row',
      backgroundColor: '#defc5f',
      margin: 10,
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
    },
    rankingsRowCol: {
      flex: 1,
      fontSize: 16,
    },
  });
  const rankings = useSelector(selectSelectedMinileagueRankings);
  const name = useSelector(selectSelectedMinileagueName);

  return (
    <ScrollView style={{ backgroundColor: '#323232' }}>
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
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100%' }}>
          <Text style={{ color: 'white', margin: 20, textAlign: 'center', fontFamily: 'Montserrat-400', fontSize: 16 }}>{`Ask your friends to join your mini-league - name: ${name}`}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const MiniLeagueTable = () => {
  const table = useSelector(selectSelectedMinileaguePreds);
  const name = useSelector(selectSelectedMinileagueName);

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
    <ScrollView style={{ backgroundColor: '#323232', minHeight: '100%' }}>
      {table.members.length > 1 ? table.matches.map((match) => (
        <View style={{ backgroundColor: '#defc5f', margin: 10, padding: 10, borderRadius: 10 }} key={match._id}>
          <Text style={{ textAlign: 'center' }}>{`${match.home_team} vs ${match.away_team}`}</Text>
          <Text>{match.live_home_score !== undefined && `${match.live_home_score} - ${match.live_away_score}`}</Text>
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
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, fontFamily: 'Montserrat-700' }}>{member.username}</Text>
                  <Text style={{ flex: 1 }}>No prediction</Text>
                </View>
              )
            );
          })}
        </View>
      )) : (
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100%' }}>
          <Text style={{ color: 'white', margin: 20, textAlign: 'center', fontFamily: 'Montserrat-400', fontSize: 16 }}>{`Ask your friends to join your mini-league - name: ${name}`}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const SingleMiniLeague = ({ route }) => {
  const dispatch = useDispatch();
  const { idx } = route.params;

  dispatch(updateSelectedIdx(idx));

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBarOptions={{ style: { backgroundColor: '#323232' }, activeTintColor: 'white' }}>
      <Tab.Screen name="Rankings" component={MiniLeagueRankings} />
      <Tab.Screen name="Table" component={MiniLeagueTable} />
    </Tab.Navigator>
  );
};

SingleMiniLeague.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      idx: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

const MiniLeagueSelector = ({ navigation }) => {
  const minileagues = useSelector(selectAllMinileagues);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#323232', borderWidth: 0 }}>
      {minileagues.map((minileague, idx) => (
        // eslint-disable-next-line no-underscore-dangle
        <View key={minileague._id} style={{ backgroundColor: '#defc5f', width: '100%', marginTop: 20, borderRadius: 15 }}>
          <Button color="black" title={minileague.name} onPress={() => navigation.navigate('SinglePage', { idx, name: minileague.name })} />
        </View>
      ))}
    </View>
  );
};

MiniLeagueSelector.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const MiniLeagues = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ headerTintColor: 'white', headerStyle: { backgroundColor: '#323232', borderWidth: 0 } }} name="Mini Leagues List" component={MiniLeagueSelector} />
    <Stack.Screen
      options={({ route }) => ({
        title: route.params.name,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#323232', borderWidth: 0 },
      })}
      name="SinglePage"
      component={SingleMiniLeague}
    />
  </Stack.Navigator>
);

export default MiniLeagues;
