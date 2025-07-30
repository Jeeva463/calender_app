import { Dimensions } from 'react-native';

export const appFonts = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  clockFont: (Dimensions.get('window').width) / 60,
};
