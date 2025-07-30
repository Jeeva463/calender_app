import { StyleSheet } from 'react-native';
import { appColors } from '../appConstants/colors';
import { appFonts } from '../appConstants/fonts';

export default StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: appColors.appBackground,
    alignItems: "center"
  },
  logoContainer: {
    flex: 0.2,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  imageContainer: {
    height: "80%",
    width: "50%"
  },
  imageView: {
    width: "100%",
    height: "100%"
  },
  loginContainer: {
    flex: 0.6,
    width: appFonts.windowWidth >= 768 ? "50%" : "45%",
    alignItems: "center",
    backgroundColor: appColors.themeWhite,
    borderRadius: 20,
    justifyContent: "space-evenly",
    marginTop:8
  },
  inputContainer: {
    width: appFonts.windowWidth >= 768 ? "80%" : "90%",
    height: "98%",
    borderWidth: appFonts.windowWidth >= 768 ? 3.5 : 2,
    borderRadius: appFonts.windowWidth >= 768 ? 15 : 10,
    borderColor: appColors.brand,
  },
  inputTextStyle: {
    fontSize: appFonts.windowWidth / 40,
    color: appColors.brand
  },
  inputTextContainer: {
    height: "100%",
    borderColor: "transparent"
  },
  inputView: {
    width: "100%",
    alignItems: "center",
    height: appFonts.windowWidth / 15,
    justifyContent: "center"
  },
  submitText: {
    fontSize: appFonts.windowWidth >= 768 ? 25 : 15,
    color: "#FFFFFF",
    fontWeight: "800"
  },
  submitContainer: {
    width: "50%",
    height: appFonts.windowWidth / 15,
    backgroundColor: appColors.brand,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60
  }
});
