import React, {useState, useEffect, useRef, createContext} from 'react';
import {
  View,
  Text,
  Image,
  NativeModules,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import _ from 'lodash';
import CustomizedDayCalenderComponent from '../commonComponent/common/customeCalenderEvent';
import ClockComp from './clock';
import BookingScreen from '../BookingScreen/bookingScreen';
import DeviceInfo from 'react-native-device-info';
import {appFonts} from '../appConstants/fonts';
import DataServices from '../api/services/DataServices';
import CommonFunctions from './Function';
import styles from './styles';
import moment from 'moment';
import {getUniqueId} from 'react-native-device-info';
import Spinner from 'react-native-loading-spinner-overlay';
import {getTimeZone} from 'react-native-localize';

const windowsWidth = Dimensions.get('screen').width;
const windowsHeight = Dimensions.get('screen').height;

// const {LedModule} = NativeModules;
export const UserContext = createContext();
export const BookingContext = createContext();

const MainComponent = props => {
  const [accesToken, setAccesToken] = useState('');
  const [customizedEvents, setCustomizedEvents] = useState([]);
  const [currentMeetingDetails, setCurrentMeetingDetails] = useState([]);

  const [visible, setVisible] = useState(false);
  const [selectedKeyIndex, setSelectedKeyIndex] = useState(0);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [memory, setMemory] = useState(0);
  const [loading, setLoading] = useState(true);

  const red = 4;
  const green = 5;
  const orange = 8;

  const apiResult = useRef();

  const heartBeartAPIRemainder = useRef(0);

  // const hearbeatService = async () => {
  //   try {
  //     heartBeartAPIRemainder.current = 1;
  //     var getMemory = 0;
  //     var deviceIdDetails = 0;
  //     getUniqueId()
  //       .then(uniqueId => {
  //         deviceIdDetails = uniqueId;
  //       })
  //       .catch(error => {
  //         console.error('geeting error in device id..', error);
  //       });
  //     var devIn = await DeviceInfo.getUsedMemory().then(usedMemory => {
  //       getMemory = usedMemory;
  //     });
  //     let memoryJson = {
  //       roomMail: props.route.params.roomMail,
  //       memory: getMemory,
  //     };
  //     var memoryResult = await DataServices.hearbeatService(memoryJson);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getMeetingList = async () => {
    try {
      var offset = new Date();
      var stTime = moment(moment.utc().startOf('day')).utcOffset(
        offset.getTimezoneOffset(),
      );
      var endDate = moment
        .utc()
        .endOf('day')
        .utcOffset(offset.getTimezoneOffset());

      var initalData = {
        startDate: moment(stTime).format('yyyy-MM-DDTH:mm:ss'),
        endDate: moment(endDate).format('yyyy-MM-DDTH:mm:ss'),
        mailId: props.route.params.roomMail,
        accessToken: accesToken !== undefined ? accesToken : '',
      };
      console.log('...', initalData);
      var meetingResults = await DataServices.getMeetings(initalData);
      console.log('meetingResults', meetingResults.response.body);
      if (meetingResults.response.body) {
        if (
          !(
            meetingResults?.accessToken &&
            meetingResults?.accessToken === accesToken
          )
        ) {
          // console.log("entry access 1")
          setAccesToken(meetingResults.accessToken);
        } else {
          if (!meetingResults?.accessToken) {
            setAccesToken('');
          }
        }

        if (
          meetingResults &&
          meetingResults.response &&
          meetingResults.response.body.length > 0
        ) {
          if (
            JSON.stringify(apiResult.current) ===
            JSON.stringify(meetingResults.response.body)
          ) {
            var currentMeetingSchedule =
              await CommonFunctions.gettingCurrentMeetingDetails(
                customizedEvents,
              );
            // if (currentMeetingSchedule?.length > 0) {
            //   if (currentMeetingDetails[0].occupied) {
            //     LedModule.createLedEvent('From React Native', red);
            //   } else {
            //     if (!currentMeetingDetails[0].occupied) {
            //       LedModule.createLedEvent('From React Native', orange);
            //     }
            //   }
            //   setCurrentMeetingDetails(currentMeetingSchedule);
            // } else {
            //   LedModule.createLedEvent('From React Native', green);
            //   if (currentMeetingDetails?.length > 0) {
            //     setCurrentMeetingDetails([]);
            //   }
            // }
          } else {
            apiResult.current = meetingResults.data;
            var customMeetingDatas = await CommonFunctions.eventCreation(
              meetingResults.response.body,
            );
            setCustomizedEvents(customMeetingDatas);
            var currentMeetingSchedule =
              await CommonFunctions.gettingCurrentMeetingDetails(
                customMeetingDatas,
              );
            if (currentMeetingSchedule?.length > 0) {
              setCurrentMeetingDetails(currentMeetingSchedule);
            } else {
              if (currentMeetingDetails?.length > 0) {
                setCurrentMeetingDetails([]);
              }
            }
          }
        } else {
          if (customizedEvents.length > 0) {
            setCustomizedEvents([]);
          }
          apiResult.current = [];
        }
      } else {
        //console.log("entry")
        if (customizedEvents?.length > 0) {
          setCustomizedEvents([]);
        }
        if (currentMeetingDetails?.length > 0) {
          setCurrentMeetingDetails([]);
        }
        // if (apiResult.current !== undefined || apiResult.current !== []) {
        //   apiResult.current = [];
        // }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      // var timezoneValues = moment.tz(moment(), getTimeZone()).format('YYYY-MM-DDTHH:mm:ss');
      // var heartBeatFireBaseConfig = (firebase.remoteConfig().getValue('app_heartbeat').asNumber() / 1000) / 60;
      // var checkMin = new Date(timezoneValues).getMinutes();
      // var heartBeatMin = checkMin % heartBeatFireBaseConfig
      // if (heartBeatMin === 0) {
      //   if (heartBeartAPIRemainder.current === 0) {
      //     await hearbeatService();
      //   }
      // } else {
      //   if (heartBeartAPIRemainder.current === 1) {
      //     heartBeartAPIRemainder.current = 0;
      //   }
      // }
    }
  };

  useEffect(() => {
    if (loading) {
      const delay = 6000; // 2000 milliseconds (2 seconds)

      const timerIds = setTimeout(() => {
        // Perform the task you want to do after the delay
        getMeetingList();
      }, delay);

      // Clean up the timer when the component unmounts or when currentState changes
      return () => clearTimeout(timerIds);
    }
  }, [loading]);

  useEffect(() => {
    const apiRender = setInterval(() => {
      getMeetingList();
    }, 15000); // Default 15 seconds instead of firebase config
    return () => clearInterval(apiRender);
  });

  return (
    <View style={[styles.parentContainerStyle, {justifyContent: 'center'}]}>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />

      <View style={styles.fullView}>
        <View style={styles.level1Container}>
          <View style={styles.leftPanel}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/chopenew.png')}
                style={{
                  width: Dimensions.get('window').width / 6,
                  height: Dimensions.get('window').width / 20,
                  right: appFonts.windowWidth / 100,
                  top: appFonts.windowWidth / 20,
                }}
              />
            </View>
            <View style={{flex: 0.25, justifyContent: 'center'}}>
              <Text style={styles.panelHeading} numberOfLines={3}>
                {props.route.params.roomName != undefined
                  ? props.route.params.roomName
                  : 'Guoco Midtown'}
              </Text>
            </View>
            <View style={{flex: 0.125, justifyContent: 'flex-start'}}>
              <Text style={styles.panelSubHeading} numberOfLines={3}>
                {currentMeetingDetails?.length != 0
                  ? currentMeetingDetails[0].organizerName
                  : ''}
              </Text>
            </View>
            <View style={{flex: 0.125, justifyContent: 'center'}}>
              <Text style={[styles.panelSubHeading, {}]} numberOfLines={1}>
                {currentMeetingDetails?.length != 0
                  ? currentMeetingDetails[0].occupied
                    ? 'Booked'
                    : 'Reserved'
                  : 'Available'}
              </Text>
            </View>
            <View style={{flex: 0.25, justifyContent: 'center'}}>
              <ClockComp />
            </View>
          </View>
        </View>
        <View style={styles.rightPanel}>
          <View style={styles.secondRightPanel}>
            <View style={styles.calenderContainer}>
              <UserContext.Provider
                value={{
                  setVisible,
                  setBookedEvents,
                  setSelectedKeyIndex,
                  events: customizedEvents,
                }}>
                <CustomizedDayCalenderComponent />
              </UserContext.Provider>
            </View>
          </View>
        </View>
      </View>
      {visible && (
        <View style={styles.bookingContainer}>
          <BookingContext.Provider
            value={{
              bookedEvents: bookedEvents,
              setLoading,
              selectedKeyIndex: selectedKeyIndex,
              eventsList: customizedEvents,
              mailid: props.route.params.roomMail,
              setVisible,
            }}>
            <BookingScreen />
          </BookingContext.Provider>
        </View>
      )}
    </View>
  );
};

export default MainComponent;
