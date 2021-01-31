import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import ContinueToAppButton from './ContinueToAppButton';

const FirstOpen = ({ setFirstOpenVisible }) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [componentLoaded, setComponentLoaded] = useState(false);

  useEffect(() => {
    setComponentLoaded(true);
  });

  const screenWidth = Dimensions.get('screen').width;

  const styles = StyleSheet.create({
    outerView: {
      backgroundColor: '#defc5f',
      flex: 1,
      padding: 40,
      margin: 30,
      borderRadius: 40,
      paddingTop: 70,
    },
    innerText: {
      textAlign: 'center',
    },
  });

  const carouselItems = [
    {
      title: 'Predict',
      text: 'Predict the outcome of all the Premier League fixtures each week.',
      numTitle: '01',
    },
    {
      title: 'Score',
      text: 'Watch your points accumulate as the goals come in.',
      numTitle: '02',
    },
    {
      title: 'Compete',
      text: 'Join a mini-league to track your progress against competitors throughout the season.',
      numTitle: '03',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.outerView}>
      <View style={{ flex: 1 }}>
        <Text adjustsFontSizeToFit style={[{ fontSize: (200), fontFamily: 'ShareTechMono-400' }, styles.innerText]}>{item.numTitle}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[{
            marginBottom: 20, textTransform: 'uppercase', fontFamily: 'Montserrat-700', fontSize: (40),
          }, styles.innerText]}
        >
          {item.title}
        </Text>
        <Text style={[{ fontFamily: 'Montserrat-400' }, styles.innerText]}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ backgroundColor: 'black', height: '100%' }}>
      <Carousel
        data={carouselItems}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={setActiveDotIndex}
      />
      {componentLoaded
      && <ContinueToAppButton onPress={setFirstOpenVisible} activeDotIndex={activeDotIndex} />}
    </View>
  );
};

FirstOpen.propTypes = {
  setFirstOpenVisible: PropTypes.func.isRequired,
};

export default FirstOpen;
