import React, { Component } from 'react';
import { Button, Text, View } from 'native-base';
import BackButton from '../../components/BackButton';

export default class WhatToPlayScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Co dziś gramy',
      headerLeft: <BackButton goBackFn={() => navigation.goBack()} />,
      headerRight: (
        <Button
          onPress={() => console.log('dodaj!')}
          transparent
          title={'coGramy'}
        >
          <Text>Done</Text>
        </Button>
      ),
    };
  };

  render() {
    return (
      <View>
        <Text>Co dziś gramy?</Text>
      </View>
    );
  }
}
