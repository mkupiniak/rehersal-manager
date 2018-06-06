import React, { Component } from 'react';
import { Button, Text, View } from 'native-base';

export default class HomeScreenButton extends Component {
  render() {
    const { children, onPressFn, styles } = this.props;

    return (
      <View style={styles.box}>
        <Button
          onPress={onPressFn}
          style={styles.button}
          title="HomeScreenButton"
        >
          <Text style={styles.text}>{children}</Text>
        </Button>
      </View>
    );
  }
}
