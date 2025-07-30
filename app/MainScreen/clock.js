import React, { useState, useEffect, memo} from 'react';
import { Text } from 'react-native';

import appStyles from '../appConstants/appStyles';
import {getTimeZone} from 'react-native-localize';

const ClockFunction = props => {
  var moment = require('moment-timezone');
  const [dt, setDt] = useState(moment.tz(moment(), getTimeZone()).format('YYYY-MM-DDTHH:mm:ss'));

  useEffect(() => {
    const secTimer = setInterval(() => {
      let timezoneValue = moment.tz(moment(), getTimeZone()).format('YYYY-MM-DDTHH:mm:ss');
      setDt(timezoneValue);
    }, 15000);
    return () => clearInterval(secTimer);
  });

  
  return (
      <Text
        style={appStyles.fontTheme}>
        {moment(dt).format('DD MMM YYYY')} {"\n"}{moment(dt).format('h:mm a')}
      </Text>
  );
};

export default memo(ClockFunction);