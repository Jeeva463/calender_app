import React, {useEffect, useRef, useState} from 'react';
// import {NativeModules, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './rootNavigator';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import remoteConfig from '@react-native-firebase/remote-config';
import Firebase from '@react-native-firebase/app';

//For Led setup in tab
// const {LedModule} = NativeModules;

const App = () => {
  const [appintilize, setAppintilize] = useState(true);
  let config = {
    apiKey: 'AIzaSyBfnKzVQvWGD-ya60LzHgJM_icjZ5PCaOQ',
    authDomain: 'calendar-app-b5a8d.firebaseapp.com',
    projectId: 'calendar-app-b5a8d',
    storageBucket: 'calendar-app-b5a8d.appspot.com',
    messagingSenderId: '859994018036',
    appId: '1:859994018036:web:a66528ef197d1f01dc0ea1',
    databaseURL: 'alailabs.com',
  };

  // useEffect(() => {
  //   // StatusBar.setHidden(true, 'none');
  //   SystemNavigationBar.navigationHide();
  //   let red = 4;
  //   let green = 5;
  //   // LedModule.createLedEvent('From React Native', green);
  //   if (!Firebase.apps.length) {
  //     Firebase.initializeApp(config);
  //   } else {
  //     Firebase.app(); // if already initialized, use that one
  //   }
  //   remoteCon();
  // }, []);

  // const remoteCon = async () => {
  //   await firebase.remoteConfig().setConfigSettings({
  //     minimumFetchIntervalMillis: 30000,
  //   });

  useEffect(() => {
    if (appintilize) {
      fireBaseConfiguration();
      // remoteCon();
    }
    const fireBaseEvents = setInterval(() => {
      remoteCon();
    }, 1800000);
    return () => clearInterval(fireBaseEvents);
  }, []);

  const fireBaseConfiguration = async () => {
    if (!Firebase.apps.length) {
      let firbaseapp = await Firebase.initializeApp(config);
      console.log('firebase initialized');
    } else {
      Firebase.app(); // if already initialized, use that one
    }
    remoteCon();
    setAppintilize(false);
  };

  const remoteCon = async () => {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 30000,
    });
    // await remoteConfig().setDefaults({
    //   android_app_version_min_ver: 1.0,
    //   // android_forceUpdate: appFonts.forceUpdateAndroid,
    //   // ios_forceUpdate: appFonts.forceUpdateIOS,
    //   // ios_app_version_min_version: appFonts.iosAppVersion,
    // });
    var firbaseresult = await remoteConfig().fetchAndActivate();
    console.log('firbaseresult', firbaseresult);
    var intialValues = await remoteConfig().setDefaults({
      app_heartbeat: 300000,
      force_restart: false,
      optional_restart_event: 23,
      refresh_event: 15000,
      restart_event: 6,
    });
  };

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
