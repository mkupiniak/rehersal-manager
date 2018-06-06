import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'native-base';

const BackButton = ({ goBackFn, text }) => (
  <Button onPress={goBackFn} title="backButton" transparent>
    <Icon
      name="arrow-back"
      style={[styles.backIcon, !!text && styles.isTextIcon]}
    />
    {text && <Text style={styles.text}>{text}</Text>}
  </Button>
);

const styles = StyleSheet.create({
  backIcon: {
    fontSize: 34,
  },
  isTextIcon: {
    marginRight: 0,
    marginLeft: 8,
  },
  text: {
    paddingLeft: 5,
  },
});

export default BackButton;
