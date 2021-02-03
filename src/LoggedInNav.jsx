import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MiniLeagues from './MiniLeagues';
import Predictions from './Predictions';
import Scoring from './Scoring';
import Homepage from './Homepage';
import questionMark from '../assets/question-mark.png';
import homeIcon from '../assets/home.png';
import correct from '../assets/correct.png';
import trophy from '../assets/trophy.png';

const LoggedInNav = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          tabBarBadgeStyle: {
            backgroundColor: 'blue', height: 12, minWidth: 12, borderRadius: 6,
          },
          showLabel: false,
          showIcon: false,
          labelPosition: 'below-icon',
          inactiveTintColor: 'black',
          activeTintColor: '#E70F0B',
          style: {
            backgroundColor: '#e3e3e3', height: 60, borderTopColor: 'transparent', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5, margin: 10, borderRadius: 50, position: 'absolute',
          },
          tabStyle: { borderRadius: 15, margin: 2 },
        }}
        lazy={false}
        sceneContainerStyle={{ backgroundColor: 'black' }}
      >
        <Tab.Screen
          options={{
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color, size }) => (
              <Image
                style={{ height: size, width: size, tintColor: color }}
                source={homeIcon}
              />
            ),
          }}
          name="Home"
          component={Homepage}
        />
        <Tab.Screen
          options={{
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color, size }) => (
              <Image
                style={{ height: size, width: size, tintColor: color }}
                source={questionMark}
              />
            ),
          }}
          name="Predictions"
          component={Predictions}
        />
        <Tab.Screen
          name="Mini Leagues"
          component={MiniLeagues}
          options={{
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color, size }) => (
              <Image style={{ height: size, width: size, tintColor: color }} source={trophy} />
            ),
          }}
        />
        <Tab.Screen
          name="Scoring"
          component={Scoring}
          options={{
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color, size }) => (
              <Image style={{ height: size, width: size, tintColor: color }} source={correct} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default LoggedInNav;
