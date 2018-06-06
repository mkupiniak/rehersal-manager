import React, { Component } from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './src/screens/Home';
import ActorsScreen from './src/screens/Actors';
import ScenesScreen from './src/screens/Scenes';
import WhatToPlayScreen from './src/screens/WhatToPlay';
import ActorModal from './src/screens/Actors/ActorModal';

const MainStack = StackNavigator(
  {
    Home: { screen: HomeScreen },
    WhatToPlay: { screen: WhatToPlayScreen },
    Actors: { screen: ActorsScreen },
    Scenes: { screen: ScenesScreen },
  },
  {
    headerMode: 'none',
  }
);

const RootStack = StackNavigator(
  {
    Main: { screen: MainStack },
    ActorModal: { screen: ActorModal },
  },
  {
    headerMode: Platform.OS === 'ios' ? 'float' : 'screen',
    mode: 'modal',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
