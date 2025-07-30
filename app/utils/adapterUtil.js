import { StatusBar, Platform, PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

const tabletFactor = DeviceInfo.isTablet() ? 1.5 : 1;

export const layoutScale = size => {
  let val = PixelRatio.roundToNearestPixel(size * tabletFactor);

  return val;
};

export const fontScale = size => {
  let val = PixelRatio.getPixelSizeForLayoutSize(size / 2.5) * tabletFactor;

  return val;
};

export const imageWidth = size => {
  return wp2dp((size / 375) * 100 + '%');
};

export const imageHeight = size => {
  // let val = PixelRatio.getPixelSizeForLayoutSize(size/2.5) * tabletFactor;

  // return val;
  return wp2dp((size / 375) * 100 + '%');
};

/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 360, 760 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const sacledWidth = dimension => {
  return wp2dp((dimension / 375) * 100 + '%');
};

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * * 360, 760 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const scaledHeight = dimension => {
  return hp2dp((dimension / 812) * 100 + '%');
};

export function getStatusBarHeight() {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight;
  }
  return 20;
}

export const statusBarHeight = getStatusBarHeight();
