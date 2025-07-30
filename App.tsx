import React, {useEffect, useRef} from 'react';
import {NativeModules, StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './rootNavigator';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {Text} from 'react-native';

//For Led setup in tab
// const {LedModule} = NativeModules;

const App = () => {
  //   let config = {
  //     apiKey: 'AIzaSyBfnKzVQvWGD-ya60LzHgJM_icjZ5PCaOQ',
  //     authDomain: 'calendar-app-b5a8d.firebaseapp.com',
  //     projectId: 'calendar-app-b5a8d',
  //     storageBucket: 'calendar-app-b5a8d.appspot.com',
  //     messagingSenderId: '859994018036',
  //     appId: '1:859994018036:web:a66528ef197d1f01dc0ea1',
  //     databaseURL: 'alailabs.com',
  //   };

  //   useEffect(() => {
  //     StatusBar.setHidden(true, 'none');
  //     SystemNavigationBar.navigationHide();
  //     let red = 4;
  //     let green = 5;
  //     // LedModule.createLedEvent('From React Native', green);
  //     if (!Firebase.apps.length) {
  //       Firebase.initializeApp(config);
  //     } else {
  //       Firebase.app(); // if already initialized, use that one
  //     }
  //     remoteCon();
  //   }, []);

  //   const remoteCon = async () => {
  //     await firebase.remoteConfig().setConfigSettings({
  //       minimumFetchIntervalMillis: 30000,
  //     });

  //     var intialValues = await firebase.remoteConfig().setDefaults({
  //       app_heartbeat: 300000,
  //       force_restart: false,
  //       optional_restart_event: 23,
  //       refresh_event: 15000,
  //       restart_event: 6,
  //     });
  //     var updatedConfig = await firebase.remoteConfig().fetchAndActivate();
  //     return 'Sucess';
  //   };

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
