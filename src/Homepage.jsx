import React from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectAllMinileaguesUserPosition } from './MiniLeagues/minileaguesSlice';
import { selectUserTotalPoints, selectUserUsername } from './User/userSlice';
import { selectFeatureMatches } from './Scoring/scoringSlice';
import { selectColorScheme } from './ColorScheme/colorSchemeSlice';

const Homepage = () => {
  const username = useSelector(selectUserUsername);
  const points = useSelector(selectUserTotalPoints);
  const minileagues = useSelector(selectAllMinileaguesUserPosition);
  const featureMatches = useSelector(selectFeatureMatches);
  const navigation = useNavigation();
  const colorScheme = useSelector(selectColorScheme);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={{
      flex: 1, backgroundColor: colorScheme.background,
    }}
    >
      <View style={{ paddingRight: 20, paddingLeft: 20, paddingTop: 30 }}>
        <Text style={{ color: 'white', fontFamily: 'Montserrat-400', fontSize: 25 }}>Good morning,</Text>
        <Text style={{ color: 'white', fontFamily: 'Montserrat-700', fontSize: 30 }}>{username.charAt(0).toUpperCase() + username.slice(1)}</Text>
      </View>
      <View style={{ marginTop: 20, paddingRight: 20, paddingLeft: 20 }}>
        <Text>
          <Text style={{ color: 'white', fontFamily: 'Montserrat-400', fontSize: 20 }}>Points: </Text>
          <Text style={{ color: 'white', fontFamily: 'Montserrat-700', fontSize: 20 }}>{points}</Text>
        </Text>
      </View>
      {featureMatches && (
      <View style={{ margin: 20 }}>
        <Text style={{ color: 'white', fontFamily: 'Montserrat-700', fontSize: 25, marginBottom: 15 }}>{featureMatches.name}</Text>
        <View style={{ backgroundColor: '#5C5C5C', padding: 10, borderRadius: 15 }}>
          {featureMatches.matches.map((match) => (
            <View key={match._id} style={{ flexDirection: 'row', backgroundColor: '#858585', marginTop: 10, marginBottom: 10, padding: 10, borderRadius: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5 }}>
              <View style={{ flex: 1 }}><Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>{match.home_team}</Text></View>
              <View><Text style={{ color: 'white', fontSize: 18 }}> vs </Text></View>
              <View style={{ flex: 1 }}><Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>{match.away_team}</Text></View>
            </View>
          ))}
        </View>
      </View>
      )}
      <View style={{ marginBottom: 20 }}>
        <Text style={{
          color: 'white', fontFamily: 'Montserrat-700', fontSize: 25, marginTop: 15, marginBottom: 15, paddingRight: 20, paddingLeft: 20,
        }}
        >
          Mini-leagues
        </Text>
        {minileagues.map((minileague) => (
          <View key={minileague.name} style={{ backgroundColor: '#5C5C5C', marginRight: 20, marginLeft: 20, padding: 10, borderRadius: 15 }}>
            <Text style={{ color: 'white', fontFamily: 'Montserrat-400', fontSize: 25, marginBottom: 10 }}>{minileague.name}</Text>
            {minileague.arr.map((user) => (
              <View key={user.username} style={{ flexDirection: 'row', backgroundColor: '#858585', marginTop: 10, marginBottom: 10, padding: 10, borderRadius: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5 }}>
                <Text style={{ color: 'white', flex: 1, fontSize: 20 }}>{user.position}</Text>
                <Text style={{ color: 'white', flex: 1, fontSize: 20 }}>{user.username}</Text>
                <Text style={{ color: 'white', flex: 1, fontSize: 20 }}>{user.points}</Text>
              </View>
            ))}
            <View>
              <Button title="View more..." color="white" onPress={() => navigation.navigate('Mini Leagues', { screen: 'SinglePage', params: { name: minileague.name } })} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Homepage;
