/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes, Image } from 'react-native';
import Color from './Color';

export default function Send({ text, containerStyle, onSend, children, textStyle, label, alwaysShowSend }) {
  if (alwaysShowSend || text.trim().length >= 0) {
    return (
      <TouchableOpacity
        testID="send"
        accessible
        accessibilityLabel="send"
        style={[styles.container, containerStyle]}
        onPress={() => {
          onSend({ text: text.trim() }, true);
        }}
        accessibilityTraits="button"
      >
        <View>{children || <Image source={require('../../../images/sendMessage.png')} style={styles.sendMsg} />}</View>
      </TouchableOpacity>
    );
  }
  return <View />;
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'flex-end',
  },
  sendMsg: {
    margin: 5,
    marginBottom:10,
    marginRight: 17,
    height : 30,
    width: 30
  },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});

Send.defaultProps = {
  text: '',
  onSend: () => {},
  label: 'Send',
  containerStyle: {},
  textStyle: {},
  children: null,
  alwaysShowSend: false,
};

Send.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  children: PropTypes.element,
  alwaysShowSend: PropTypes.bool,
};
