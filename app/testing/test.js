import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView, Dimensions, TouchableOpacity, Alert
} from 'react-native';
import { Icon, ButtonGroup, Text } from '@rneui/themed';
import { appColors } from '../appConstants/colors';
import DataServices from '../api/services/DataServices';
import { getUniqueId } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styleTest';
import { textFile } from '../appConstants/textFile'
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const windowsWidth = Dimensions.get("window").width;

export default CustomizedDayCalenderComponent = () => {

  const navigation = useNavigation();
  var _ = require('lodash');
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const component1 = () => <Text style={{ fontSize: windowsWidth >= 768 ? 30 : 15, fontWeight: "bold", color: (selectedIndex == 0) ? "#FFFFFF" : "Black" }}>Available Rooms</Text>
  const component2 = () => <Text style={{ fontSize: windowsWidth >= 768 ? 30 : 15, fontWeight: "bold", color: (selectedIndex == 1) ? "#FFFFFF" : "Black" }}>Booked Rooms</Text>
  const buttons = [{ element: component1 }, { element: component2 }]
  const [availableRoom, setAvailableRoom] = useState([]);
  const [bookedrooms, setBookedRooms] = useState([]);
  const [DummyArray, setDummyArray] = useState([]);
  const [deviceid, setDeviceid] = useState("");
  const [spinnerLoading, setspinnerLoading] = useState(false);

  useEffect(() => {
    getDeviceDetails();
    DataServices.getMeetingRooms()
      .then(response => {
        var dummyArray = [];
        response.data?.forEach((item, index) => {
          let dummyItems = {
            id: index,
            value: item.displayName,
            state: item.linked,
            roomMail: item.emailAddress,
            roomName: item.displayName
          }
          dummyArray.push(dummyItems);
        });
        var dummy1 = _.filter(
          dummyArray, function (o) {
            return o.state;
          }
        );
        var dummy2 = _.filter(
          dummyArray, function (o) {
            return !o.state;
          }
        );
        setBookedRooms(dummy1)
        setAvailableRoom(dummy2)
        setData(dummyArray);
      }).catch(e => {
        console.log(e);
      });
  },[]);

  const getDeviceDetails = () => {
    getUniqueId().then((uniqueId) => {
      setDeviceid(uniqueId)
      }).catch((error) => {
        console.error("geeting error in device id..", error);
      });
  }

  const storeRoomData = async (value) => {
    try {
      await AsyncStorage.setItem('roomName', value)
    } catch (e) {
      console.error("error meessage..",e)
    }
  }

  const LinkingFunction = async () => {
    try{
    if (DummyArray.length == 0) {
      Alert.alert("Select Any Rooms to continue")
    } else {
      setspinnerLoading(true);
      var roomId;
      var roomMailId;
      var roomName;
      availableRoom.forEach((item, index) => {
        if (item.state) {
          roomId = item.id
          roomMailId = item.roomMail
          roomName = item.roomName
        }
      })
      var data = {
        "mailId": roomMailId,
        "deviceId": deviceid
      }
      DataServices.linkRoom(data).then(res => {
        let val = {
          roomMail: roomMailId,
          roomName: roomName,
          "status": "success"
        }
        if (res?.data === "Room Linked Successfully") {
          storeRoomData(JSON.stringify(val))
          setspinnerLoading(false);
          navigation.navigate('MainScreen', {
            roomMail: val.roomMail,
            roomName: val.roomName,
            deviceid: deviceid,
          });
        } else {
          Alert.alert("Please contact admin")
        }
      }).catch(e => {
        console.log(e)
        setspinnerLoading(false);
        Alert.alert("Something Went Wrong Please Try Again")
      });
    }}catch(error) {
      throw error;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Spinner
                    visible={spinnerLoading}
                    textContent={""}
                    textStyle={{ color: '#FFF' }}
                />
      <View style={styles.containerHeading}>
        <Text style={styles.headingText}>{textFile.LinkHeading}</Text>
      </View>
      <View style={styles.parentButton}>
        <View style={styles.buttonContainer}>
          <ButtonGroup
            onPress={(value) => setSelectedIndex(value)}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.buttonGroupStyle}
          />
        </View>
      </View>
      <View style={styles.parentButtonGroup}>
        <Text style={styles.headingTextStyle}>{selectedIndex == 0 ? textFile.LinkSelect : textFile.AvailLink}</Text>
        <View style={{ flex: 0.9, width: "100%" }}>
          {selectedIndex == 0 &&
            <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={true} contentContainerStyle={{ flexDirection: "row", marginBottom: 20, paddingLeft: 20, paddingRight: 20, flexWrap: "wrap", overflow: "hidden" }} >
              {availableRoom?.map((item, value) => {
                return (
                  <TouchableOpacity style={{ borderRadius: 70, alignItems: "center", backgroundColor: item.state ? "#2089DC" : "#FFFFFF", borderRadius: 50, padding: 10, alignSelf: 'center', justifyContent: "center", borderWidth: 1.5, borderColor: "#2089DC", marginBottom: 20, marginLeft: 20, }}
                    key={value} onPress={() => {
                      var dummyField = [];
                      availableRoom.map((i, v) => {
                        if (i.id == item.id) {
                          i.state = !i.state
                        } else {
                          i.state = false
                        }
                        dummyField.push(i);

                      });
                      let dummyarray = availableRoom.filter((x, ke) => x.state == true);
                      if (dummyarray.length > 0) {
                        setDummyArray(dummyarray);
                      }
                      setAvailableRoom(dummyField);
                    }}>
                    <Text style={{ fontSize: windowsWidth > 768 ? 25 : 13, color: item.state ? "#FFFFFF" : "#2089DC", fontWeight: "800", paddingLeft: 10, paddingRight: 30 }} numberOfLines={1}>{item.value}</Text>
                    <View style={{ position: "absolute", right: 10 }}>
                      <Icon name={!item.state ? "unlock-alt" : "lock"}
                        type="font-awesome"
                        size={windowsWidth > 768 ? 20 : 15}
                        color={item.state ? "#FFFFFF" : "#2089DC"}
                      />
                    </View>
                  </TouchableOpacity>

                )
              })}
            </ScrollView>
          }
          {selectedIndex == 1 &&
            <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={true} contentContainerStyle={{ flexDirection: "row", marginBottom: 20, paddingLeft: 20, paddingRight: 20, flexWrap: "wrap", overflow: "hidden" }} >
              {bookedrooms?.map((item, value) => {
                return (
                  <View style={{ borderRadius: 70, alignItems: "center", backgroundColor: item.state ? "#2089DC" : "#FFFFFF", borderRadius: 50, padding: 10, alignSelf: 'center', justifyContent: "center", borderWidth: 1.5, borderColor: "#2089DC", marginBottom: 20, marginLeft: 20, }}
                    key={value}>
                    <Text style={{ fontSize: windowsWidth > 768 ? 25 : 13, color: item.state ? "#FFFFFF" : "#2089DC", fontWeight: "800", paddingLeft: 10, paddingRight: 30 }} numberOfLines={1}>{item.value}</Text>
                    <View style={{ position: "absolute", right: 10 }}>
                      <Icon name={!item.state ? "unlock-alt" : "lock"}
                        type="font-awesome"
                        size={windowsWidth > 768 ? 20 : 15}
                        color={item.state ? "#FFFFFF" : "#2089DC"}
                      />
                    </View>
                  </View>

                )
              })}
            </ScrollView>
          }
        </View>
      </View>
      <View style={{
        width: "50%", flex: 0.15, alignItems: "center", justifyContent: "center"
      }}>
        <TouchableOpacity
          style={{
            width: "50%",
            height: windowsWidth >= 768 ? 70 : 35,
            backgroundColor: appColors.brand,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 60
          }}
          onPress={(e) => LinkingFunction()}>
          <Text style={{ fontSize: windowsWidth >= 768 ? 35 : 15, color: "#FFFFFF", fontWeight: "800" }}>Link</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};



