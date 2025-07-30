import { StyleSheet } from 'react-native';
import { appColors } from '../appConstants/colors';
import { appFonts } from '../appConstants/fonts';

export default StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: appColors.appBackground,
    justifyContent: "center",
    alignItems: "center"
  },
  imageView: {
    flex: 0.4,
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  images: {
    width: appFonts.windowWidth / 3,
    height: appFonts.windowWidth / 3,
  },
  coprightView: {
    position: "absolute",
    bottom: 30
  },
  copyRightText: {
    color: appColors.themeWhite,
    fontSize: (appFonts.windowWidth) / 60,
  },
  FooterContainer: {
    position: "absolute",
    bottom: 20,
    right: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  footerImage: {
    width: (appFonts.windowWidth) / 8,
    height: (appFonts.windowHeight) / 12,
    resizeMode: "contain"
  },
});
