import React, {useState, useEffect, memo} from 'react';
import {Text} from 'react-native';

import appStyles from '../appConstants/appStyles';
import {getTimeZone} from 'react-native-localize';
import RNRestart from 'react-native-restart';
import remoteConfig from '@react-native-firebase/remote-config';

const ClockFunction = props => {
  var moment = require('moment-timezone');
  const [dt, setDt] = useState(
    moment.tz(moment(), getTimeZone()).format('YYYY-MM-DDTHH:mm:ss'),
  );

  useEffect(() => {
    const secTimer = setInterval(() => {
      let timezoneValue = moment
        .tz(moment(), getTimeZone())
        .format('YYYY-MM-DDTHH:mm:ss');
      let currentTime = new Date(timezoneValue).getHours();
      if (
        currentTime == remoteConfig().getValue('restart_event').asNumber() ||
        currentTime ==
          remoteConfig().getValue('optional_restart_event').asNumber()
      ) {
        let minCheck = new Date(timezoneValue).getMinutes();
        let secCheck = new Date(timezoneValue).getSeconds();
        if (minCheck == 1 && secCheck <= 30) {
          RNRestart.Restart();
        }
      }
      setDt(timezoneValue);
    }, 15000);
    return () => clearInterval(secTimer);
  });

  return (
    <Text style={appStyles.fontTheme}>
      {moment(dt).format('DD MMM YYYY')} {'\n'}
      {moment(dt).format('h:mm a')}
    </Text>
  );
};

export default memo(ClockFunction);
