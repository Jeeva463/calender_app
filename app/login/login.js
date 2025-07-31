import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Input, Text} from '@rneui/themed';
import {appColors} from '../appConstants/colors';
import {textFile} from '../appConstants/textFile';
import auth from '@react-native-firebase/auth';
import {getUniqueId} from 'react-native-device-info';
import DataService from '../api/services/DataServices';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styleLogin';
import {firebase} from '@react-native-firebase/remote-config';
import {useNavigation} from '@react-navigation/native';

export default Login = () => {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [spinnerLoading, setspinnerLoading] = useState(false);
  const [submitAction, setSubmitAction] = useState(false);
  const [userDetails, setUserDetails] = useState({
    roomMail: '',
    roomName: '',
    status: 'failure',
  });
  const navigation = useNavigation();
  useEffect(() => {
    devicedetails();
  }, []);

  //"sivaramakrishnan@alai-labs.com"
  //"Alai1234$"
  const devicedetails = async () => {
    let device;
    var deviceId = getUniqueId().then(uniqueId => {
      // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
      // Android: "dd96dec43fb81c97"
      // Windows: "{2cf7cb3c-da7a-d508-0d7f-696bb51185b4}"
      device = uniqueId;
      console.log(device);
    });

    var apidata = await DataService.getDeviceDetails(device)
      .then(response => {
        let val = {
          roomMail: response.data.emailAddress,
          roomName: response.data.displayName,
          status: 'success',
        };
        storeRoomData(JSON.stringify(val));
        setUserDetails(val);
        setSubmitAction(true);
      })
      .catch(e => {
        setSubmitAction(true);
      });
  };

  const storeUserData = async value => {
    try {
      await AsyncStorage.setItem('username', value);
    } catch (e) {
      // saving error
    }
  };

  const storeRoomData = async value => {
    try {
      await AsyncStorage.setItem('roomName', value);
    } catch (e) {
      // saving error
    }
  };

  const redirectFunc = val => {
    if (val.status == 'success') {
      navigation.navigate('MainScreen', {
        roomMail: val.roomMail,
        roomName: val.roomName,
      });
    } else {
      navigation.navigate('Testing1');
    }
  };

  const login = async () => {
    setspinnerLoading(true);
    console.log('login check');
    let apidataCall = await auth()
      .signInWithEmailAndPassword(userName, password)
      .then(response => {
        storeUserData(userName);
        if (response && response.user) {
          redirectFunc(userDetails);
        } else {
          Alert.alert('Invalid Credentials');
        }
      })
      .catch(error => {
        Alert.alert(`Something went worng${error}`);
      });
    setspinnerLoading(false);
  };

  const submitButtonFun = () => {
    if (password.length > 0 && userName.length > 0) {
      //login();
      navigation.navigate('MainScreen', {
        roomMail: 'basfadmin@gmail.com',
        roomName: 'Guoco Midtown',
      });
    } else {
      Alert.alert('All the fields are mandatory');
    const login = async () => {
        setspinnerLoading(true);
        console.log("login check")
        // Simplified login without Firebase auth for now
        storeUserData(userName);
        redirectFunc(userDetails);
        setspinnerLoading(false);
    }
  };
}

  return (
    <>
      <KeyboardAvoidingView style={styles.homeView}>
        <Spinner
          visible={spinnerLoading}
          textContent={''}
          textStyle={{color: '#FFF'}}
        />
        <View style={styles.logoContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/chopenew.png')}
              style={styles.imageView}
              resizeMode={'contain'}
            />
            s
          </View>
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.inputView}>
            <Input
              placeholder={textFile.emailPlaceHolder}
              onChangeText={e => setUserName(e)}
              value={userName}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputTextContainer}
              style={styles.inputTextStyle}
              placeholderTextColor={appColors.brand}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              placeholder={textFile.passwordPlaceHolder}
              onChangeText={e => setPassword(e)}
              value={password}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputTextContainer}
              style={styles.inputTextStyle}
              placeholderTextColor={appColors.brand}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={styles.submitContainer}
            disabled={submitAction ? false : true}
            onPress={() => submitButtonFun()}>
            <Text style={styles.submitText}>{textFile.Submit}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
