/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import moment from 'moment';

import Color from './Color';

import { isSameDay } from './utils';
import { DATE_FORMAT } from './Constant';

export default function Day(
  { dateFormat, currentMessage, previousMessage, nextMessage, containerStyle, wrapperStyle, textStyle, inverted },
  context,
) {
   
    let currentDate = new Date()
    let currentDateYear = moment(currentDate).format('DD/MM/YYYY')
    let todaysDate = moment(currentMessage.createdAt).format('DD/MM/YYYY');
    let lastmessageDate = new Date(currentMessage.createdAt);

    let yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const date1 = new Date(yesterday);
    date2 = new Date(todaysDate);
    difference = (date1.getTime() - date2.getTime()) / 1000;
    difference /= (60 * 60);
    var difference1 = Math.abs(Math.round(difference));
    var duration = moment.duration(moment(currentDate, 'MM/DD/YYYY').diff(moment(lastmessageDate, 'MM/DD/YYYY'))).asHours();
    var midnight = moment(currentDate).startOf("day");
    let midNightDate = new Date(midnight);
    var midNightDuration = moment.duration(moment(currentDate, 'MM/DD/YYYY hh:mm').diff(moment(midNightDate, 'MM/DD/YYYY hh:mm'))).asHours();
    // console.log('difference', moment(todaysDate).fromNow());

    if(currentDateYear == todaysDate){
      return (
      <View style={[styles.container, containerStyle]}>
        <View style={wrapperStyle}>
          <Text style={[styles.text, textStyle]}>
            {moment(currentMessage.createdAt).format('hh:mm')}
          </Text>
        </View>
      </View>
    );
    }
    else{
      if((duration < 24) && (duration > midNightDuration)){
        return (
      <View style={[styles.container, containerStyle]}>
        <View style={wrapperStyle}>
          <Text style={[styles.text, textStyle]}>
            {moment(currentMessage.createdAt)
              .locale(context.getLocale())
              .format(dateFormat)
              .toUpperCase()}
          </Text>
        </View>
      </View>
    );
   
      }else{
        return (
      <View style={[styles.container, containerStyle]}>
        <View style={wrapperStyle}>
          <Text style={[styles.text, textStyle]}>
            {moment(currentMessage.createdAt).format('DD MMM')}
          </Text>
        </View>
      </View>
    );
      }

  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.defaultColor,
    fontSize: 12,
    fontWeight: '600',
  },
});

Day.contextTypes = {
  getLocale: PropTypes.func,
};

Day.defaultProps = {
  currentMessage: {
    // TODO: test if crash when createdAt === null
    createdAt: null,
  },
  previousMessage: {},
  nextMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  dateFormat: DATE_FORMAT,
};

Day.propTypes = {
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  inverted: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  dateFormat: PropTypes.string,
};
