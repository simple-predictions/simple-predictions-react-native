import React from 'react';
import {
  Text, View, Button, ScrollView, Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectAllMinileaguesUserPosition } from './MiniLeagues/minileaguesSlice';
import { selectUserTotalPoints, selectUserUsername } from './User/userSlice';
import { selectFeatureMatches } from './Scoring/scoringSlice';
import { selectColorScheme } from './ColorScheme/colorSchemeSlice';
import Badges from './ImageLoader';

const Homepage = () => {
  const username = useSelector(selectUserUsername);
  const points = useSelector(selectUserTotalPoints);
  const minileagues = useSelector(selectAllMinileaguesUserPosition);
  const featureMatches = useSelector(selectFeatureMatches);
  const navigation = useNavigation();
  const colorScheme = useSelector(selectColorScheme);

  return (
    <ScrollView
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
          color: colorScheme.secondary, fontFamily: 'Montserrat-700', fontSize: 25, marginBottom: 15,
        }}
        >
          {featureMatches.name}
        </Text>
        <View style={{
          backgroundColor: colorScheme.third, paddingTop: 10, paddingBottom: 10, borderRadius: 15,
        }}
        >
          {featureMatches.matches.map((match) => (
            <View
              // eslint-disable-next-line no-underscore-dangle
              key={match._id}
              style={{
                flexDirection: 'row', backgroundColor: colorScheme.fourth, marginTop: 10, marginBottom: 10, padding: 10, paddingTop: 30, borderRadius: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5, alignItems: 'center',
              }}
            >
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View>
                  <View style={{ position: 'absolute', width: 80, height: 80, top: -10, left: -10, borderRadius: 100 / 2, backgroundColor: '#E4E3E5' }} />
                  <Image style={{ height: 60, width: 60, resizeMode: 'contain'}} source={Badges[match.home_team.replaceAll(' ', '')]} />
                </View>
                <Text style={{ color: colorScheme.secondary, fontSize: 15, padding: 10, flex: 1, textAlign: 'center' }}>{match.home_team}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View>
                  <View style={{ position: 'absolute', width: 80, height: 80, top: -10, left: -10, borderRadius: 100 / 2, backgroundColor: '#E4E3E5' }} />
                  <Image style={{ height: 60, width: 60, resizeMode: 'contain'}} source={Badges[match.away_team.replaceAll(' ', '')]} />
                </View>
                <Text style={{ color: colorScheme.secondary, fontSize: 15, padding: 10, flex: 1, textAlign: 'center' }}>{match.away_team}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      )}
      <View style={{ marginBottom: 20 }}>
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
