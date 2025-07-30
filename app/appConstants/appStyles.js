import { StyleSheet } from 'react-native';
import { appColors } from './colors';
import { appFonts } from '../appConstants/fonts';

export default StyleSheet.create({
  parentContainerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  mainView: {
    width: "100%",
    height: "100%"
  },
  fontTheme: {
    fontSize: appFonts.clockFont,
    color: appColors.white,
    fontWeight: 'bold',
  }
})