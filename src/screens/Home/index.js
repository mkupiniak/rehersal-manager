import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import HomeScreenButton from '../../components/HomeScreenButton';

const windowHeight = Dimensions.get('window').height;

const boxesNumber = 3;
const headerHeight = 64;
const boxPadding = 20;
const boxHeight = (windowHeight - headerHeight) / boxesNumber;

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Rehersal Manager',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content style={styles.content}>
          <HomeScreenButton
            onPressFn={() => navigate('WhatToPlay')}
            styles={styles}
          >
            Co dziś gramy?
          </HomeScreenButton>

          <HomeScreenButton
            onPressFn={() => navigate('Actors')}
            styles={styles}
          >
            Aktorzy
          </HomeScreenButton>

          <HomeScreenButton
            onPressFn={() => navigate('Scenes')}
            styles={styles}
          >
            Sceny
          </HomeScreenButton>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
  },
  box: {
    height: boxHeight,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    padding: boxPadding,
  },
  button: {
    height: boxHeight - boxPadding * 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#2e739b',
  },
  text: {
    fontSize: 24,
    lineHeight: 24,
  },
});
