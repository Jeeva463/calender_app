import _ from 'lodash';
import moment from 'moment';
import {getTimeZone } from "react-native-localize";


const eventCreation = async (data) => {
  try {
    var eventList = [];
      _.forEach(data, function (item) {
      let dummyItems = {
            "start":new Date(moment.utc(item.startDate).utcOffset(moment().utcOffset()).format('YYYY-MM-DDTHH:mm:ss')),
            "end":new Date(moment.utc(item.endDate).utcOffset(moment().utcOffset()).format('YYYY-MM-DDTHH:mm:ss')),
            "organizerName": item.organizerName,
            "title": item.organizerMail,
            "occupied":item.occupied,
            "startMin":moment.utc(item.startDate).local().format("m"),
            "endMin":moment.utc(item.endDate).local().format("m")
      }
      eventList.push(dummyItems);
      });
      return eventList;
  } catch (error) {
        console.log("checking error...",error)
    } 
}

const gettingCurrentMeetingDetails = (data) => {
    try {     
      var meetingLists = data.filter(({ start, end }) => gettimeDiffVal(start, end));
      return meetingLists;
    } catch (error) {
      console.log("error message in currentmeeting loop...,", error);
  };
}

const gettimeDiffVal = (startTime, endTime) => {
  try {
      var moment = require('moment-timezone');
      var dummyDate = moment.tz(moment(), getTimeZone()).format('YYYY-MM-DD HH:mm:ss');    
      var diff1 = (moment(startTime).diff(dummyDate, 'minutes', true));
      var diff2 = (moment(endTime).diff(dummyDate, 'minutes', true));
      if (diff1 <= 0 && diff2 >= 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error for getting time difference...,", error);
    }    
  }
  

export default {
  eventCreation,
  gettingCurrentMeetingDetails
}