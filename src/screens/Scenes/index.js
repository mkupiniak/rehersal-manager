import React, { Component } from 'react';
import { Text, View } from 'native-base';
import BackButton from '../../components/BackButton';

export default class ScenesScreen extends Component {
  static navigationOptions({ navigation }) {
    return {
      title: 'Sceny',
      headerLeft: <BackButton goBackFn={() => navigation.goBack()} />,
    };
  }
  render() {
    return (
      <View>
        <Text>Scenes</Text>
      </View>
    );
  }
}
