import React, {useState, memo, useContext} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {ButtonGroup} from '@rneui/themed';
import _ from 'lodash';
import {appColors} from '../appConstants/colors';
import {appFonts} from '../appConstants/fonts';
import {textFile} from '../appConstants/textFile';
import appStyles from '../appConstants/appStyles';
import DataService from '../api/services/DataServices';
import {getTimeZone} from 'react-native-localize';
import {BookingContext} from '../MainScreen/MainScreen';
import styles from './styles';

const BookingScreen = () => {
  const {bookedEvents, setLoading, selectedKeyIndex, mailid, setVisible} =
    useContext(BookingContext);
  //console.log(bookedEvents)
  const [selectedIndex, setSelectedIndex] = useState(
    bookedEvents?.length > 0 ? 1 : 0,
  );
  const [halfTimeSlot, setHalfTimeSlot] = useState([
    {index: 0, value: true},
    {index: 2, value: false},
  ]);
  const [disableState, setDisableState] = useState(
    bookedEvents?.length > 0 ? [0] : [],
  );
  var moment = require('moment-timezone');
  var currentDates = moment
    .tz(moment(), getTimeZone())
    .format('YYYY-MM-DDTHH:mm:ss');
  var currentDate = moment(currentDates).format('yyyy-MM-DD');
  var selectkey = 0;
  var endselctedkey = 0;
  if (selectedIndex === 0) {
    if (selectedKeyIndex < 10) {
      selectkey = `0${selectedKeyIndex}:00:00`;
      endselctedkey = `0${selectedKeyIndex + 1}:00:00`;
    } else {
      selectkey = `${selectedKeyIndex}:00:00`;
      endselctedkey = `${selectedKeyIndex + 1}:00:00`;
    }
  } else if (bookedEvents?.length > 0) {
    if (bookedEvents[0].startMin == '0') {
      if (selectedKeyIndex < 10) {
        selectkey = `0${selectedKeyIndex}:30:00`;
        endselctedkey = `0${selectedKeyIndex + 1}:00:00`;
      } else {
        selectkey = `${selectedKeyIndex}:30:00`;
        endselctedkey = `${selectedKeyIndex + 1}:00:00`;
      }
    } else {
      if (selectedKeyIndex < 10) {
        selectkey = `0${selectedKeyIndex}:00:00`;
        endselctedkey = `0${selectedKeyIndex}:30:00`;
      } else {
        selectkey = `${selectedKeyIndex}:00:00`;
        endselctedkey = `${selectedKeyIndex}:30:00`;
      }
    }
  } else if (halfTimeSlot[0].value && halfTimeSlot[1].value) {
    if (selectedKeyIndex < 10) {
      selectkey = `0${selectedKeyIndex}:00:00`;
      endselctedkey = `0${selectedKeyIndex + 1}:00:00`;
    } else {
      selectkey = `${selectedKeyIndex}`;
      endselctedkey = `${selectedKeyIndex + 1}:00:00`;
    }
  } else if (!halfTimeSlot[0].value && halfTimeSlot[1].value) {
    if (selectedKeyIndex < 10) {
      selectkey = `0${selectedKeyIndex}:30:00`;
      endselctedkey = `0${selectedKeyIndex + 1}:00:00`;
    } else {
      selectkey = `${selectedKeyIndex}:30:00`;
      endselctedkey = `${selectedKeyIndex + 1}:00:00`;
    }
  } else if (halfTimeSlot[0].value && !halfTimeSlot[1].value) {
    if (selectedKeyIndex < 10) {
      selectkey = `0${selectedKeyIndex}:00:00`;
      endselctedkey = `0${selectedKeyIndex}:30:00`;
    } else {
      selectkey = `${selectedKeyIndex}:00:00`;
      endselctedkey = `${selectedKeyIndex}:30:00`;
    }
  }

  const dataFun = async () => {
    var data = {
      organizerEmail: 'meetingroom@fiber-transmission.com',
      startTime: new moment(`${currentDate}T${selectkey}`)
        .utc()
        .format('yyyy-MM-DD HH:mm:ss'),
      endTime: new moment(`${currentDate}T${endselctedkey}`)
        .utc()
        .format('yyyy-MM-DD HH:mm:ss'),
    };
    setLoading(true);
    console.log('create data', data);
    DataService.createMeeting(data)
      .then(res => {
        console.log('response...', res);
        setVisible(false);
      })
      .catch(e => {
        setVisible(false);
      });
  };
  const component2 = () => (
    <Text
      style={{
        color: selectedIndex != 1 ? 'black' : 'white',
        fontSize: appFonts.windowWidth / 80,
      }}>
      30 mins
    </Text>
  );
  const component1 = () => (
    <Text
      style={{
        color: selectedIndex != 0 ? 'black' : 'white',
        fontSize: appFonts.windowWidth / 80,
      }}>
      1 hour
    </Text>
  );
  const buttons = [{element: component1}, {element: component2}];
  const [forOneHour, setForOneHour] = useState('');
  const updateIndex = selectedIndex => {
    setForOneHour();
    setHalfTimeSlot([
      {index: 0, value: true},
      {index: 2, value: false},
    ]);
    setSelectedIndex(selectedIndex);
  };

  const textValuesForOneHour = () => {
    var startTime = moment(currentDate).set({
      hour: selectedKeyIndex,
      minute: '00',
      second: '00',
    });
    var endTime = moment(currentDate).set({
      hour: selectedKeyIndex + 1,
      minute: '00',
      second: '00',
    });
    return (
      <TouchableOpacity style={styles.onehourContainer}>
        <Text style={styles.onehourText}>{`${moment(startTime).format(
          'hh:mm',
        )} - ${moment(endTime).format('hh:mm A')}`}</Text>
      </TouchableOpacity>
    );
  };

  const textValuesForHalfHour = () => {
    var firstStartTime = moment(currentDate).set({
      hour: selectedKeyIndex,
      minute: '00',
      second: '00',
    });
    var firstEndTime = moment(currentDate).set({
      hour: selectedKeyIndex,
      minute: '30',
      second: '00',
    });
    var secondStartTime = moment(currentDate).set({
      hour: selectedKeyIndex,
      minute: '30',
      second: '00',
    });
    var secondEndTime = moment(currentDate).set({
      hour: selectedKeyIndex + 1,
      minute: '00',
      second: '00',
    });
    if (disableState.length === 0) {
      return (
        <View style={styles.halfHourContainer}>
          <TouchableOpacity
            style={[
              styles.firsthalfContainer,
              {
                backgroundColor: halfTimeSlot[0].value
                  ? appColors.appBackground
                  : '#dcdcdc',
              },
            ]}
            onPress={() => {
              setHalfTimeSlot([
                {index: 0, value: true},
                {index: 2, value: false},
              ]);
            }}>
            <Text
              style={[
                styles.firsthalftext,
                {
                  color: halfTimeSlot[0].value
                    ? appColors.white
                    : appColors.btnBg,
                },
              ]}>{`${moment(firstStartTime).format('hh:00')} - ${moment(
              firstEndTime,
            ).format('hh:mm A')}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.secondhalfContainer,
              {
                backgroundColor: halfTimeSlot[1].value
                  ? appColors.appBackground
                  : '#dcdcdc',
              },
            ]}
            onPress={() => {
              setHalfTimeSlot([
                {index: 0, value: false},
                {index: 2, value: true},
              ]);
            }}>
            <Text
              style={[
                styles.firsthalftext,
                {
                  color: halfTimeSlot[1].value
                    ? appColors.white
                    : appColors.btnBg,
                },
              ]}>{`${moment(secondStartTime).format('hh:mm')} - ${moment(
              secondEndTime,
            ).format('hh:mm A')}`}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      if (bookedEvents[0].startMin == '0') {
        return (
          <View style={styles.halfHourContainer}>
            <TouchableOpacity
              style={[
                styles.firsthalfContainer,
                {
                  backgroundColor:
                    bookedEvents[0].startMin == '0'
                      ? '#dcdcdc'
                      : appColors.appBackground,
                },
              ]}
              disabled={bookedEvents[0].startMin == '0' ? true : false}>
              <Text
                style={[
                  styles.firsthalftext,
                  {
                    color:
                      bookedEvents[0].startMin == '0'
                        ? appColors.btnBg
                        : appColors.white,
                  },
                ]}>{`${moment(firstStartTime).format('hh:00')} - ${moment(
                firstEndTime,
              ).format('hh:mm A')}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.secondhalfContainer,
                {
                  backgroundColor:
                    bookedEvents[0].startMin == '0'
                      ? appColors.appBackground
                      : '#dcdcdc',
                },
              ]}
              disabled={bookedEvents[0].startMin == '0' ? false : true}>
              <Text
                style={[
                  styles.firsthalftext,
                  {
                    color:
                      bookedEvents[0].startMin == '30'
                        ? appColors.btnBg
                        : appColors.white,
                  },
                ]}>{`${moment(secondStartTime).format('hh:mm')} - ${moment(
                secondEndTime,
              ).format('hh:mm A')}`}</Text>
            </TouchableOpacity>
          </View>
        );
      }
      if (bookedEvents[0].startMin == '30' && bookedEvents[0].endMin == '30') {
        return (
          <View style={styles.halfHourContainer}>
            <TouchableOpacity
              style={[styles.firsthalfContainer, {backgroundColor: '#dcdcdc'}]}
              disabled={true}>
              <Text
                style={[
                  styles.firsthalftext,
                  {color: appColors.btnBg},
                ]}>{`${moment(firstStartTime).format('hh:00')} - ${moment(
                firstEndTime,
              ).format('hh:mm A')}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.secondhalfContainer,
                {backgroundColor: appColors.appBackground},
              ]}
              disabled={false}>
              <Text
                style={[
                  styles.firsthalftext,
                  {color: appColors.white},
                ]}>{`${moment(secondStartTime).format('hh:mm')} - ${moment(
                secondEndTime,
              ).format('hh:mm A')}`}</Text>
            </TouchableOpacity>
          </View>
        );
      }
      if (bookedEvents[0].startMin == '30' && bookedEvents[0].endMin == '0') {
        //console.log("nknkn")
        return (
          <View style={styles.halfHourContainer}>
            <TouchableOpacity
              style={[
                styles.firsthalfContainer,
                {backgroundColor: appColors.appBackground},
              ]}
              disabled={false}>
              <Text
                style={[
                  styles.firsthalftext,
                  {color: appColors.white},
                ]}>{`${moment(firstStartTime).format('hh:00')} - ${moment(
                firstEndTime,
              ).format('hh:mm A')}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.secondhalfContainer, {backgroundColor: '#dcdcdc'}]}
              disabled={true}>
              <Text
                style={[
                  styles.firsthalftext,
                  {color: appColors.btnBg},
                ]}>{`${moment(secondStartTime).format('hh:mm')} - ${moment(
                secondEndTime,
              ).format('hh:mm A')}`}</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={styles.halfHourContainer}>
            <TouchableOpacity
              style={[styles.firsthalfContainer, {backgroundColor: '#dcdcdc'}]}
              disabled={true}>
              <Text
                style={[
                  styles.firsthalftext,
                  {color: appColors.btnBg},
                ]}>{`${moment(firstStartTime).format('hh:00')} - ${moment(
                firstEndTime,
              ).format('hh:mm A')}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.secondhalfContainer,
                {backgroundColor: appColors.appBackground},
              ]}
              disabled={false}>
              <Text
                style={[
                  styles.firsthalftext,
                  {color: appColors.white},
                ]}>{`${moment(secondStartTime).format('hh:mm')} - ${moment(
                secondEndTime,
              ).format('hh:mm A')}`}</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
  };
  return (
    <View style={[appStyles.mainView, styles.fullView]}>
      <Text style={styles.headingStyle}>{textFile.BookingScreen}</Text>
      <View style={styles.parentView}>
        <Text style={styles.parentHeading}>{textFile.SlotsDurations}</Text>
        <View style={{width: '75%'}}>
          <ButtonGroup
            onPress={updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            disabled={disableState}
            containerStyle={styles.buttonContainer}
            selectedButtonStyle={{backgroundColor: appColors.appBackground}}
          />
        </View>
      </View>
      <View style={styles.timeSlotContainer}>
        <Text style={styles.timeSlotHeading}>{textFile.TimeSlots}</Text>
        {selectedIndex === 0 && textValuesForOneHour()}
        {selectedIndex === 1 && textValuesForHalfHour()}
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.bookNowContainer}
          onPress={() => {
            dataFun();
          }}>
          <Text style={styles.bookHeading}>{textFile.BookNow}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelContainer}
          onPress={() => setVisible(false)}>
          <Text style={styles.cancelHeading}>{textFile.Cancel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(BookingScreen);
