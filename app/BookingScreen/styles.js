import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import {
  layoutScale,
  fontScale,
  sacledWidth,
  scaledHeight,
} from '../utils/adapterUtil';
import { appColors } from '../appConstants/colors';
import { appFonts } from '../appConstants/fonts';

export default StyleSheet.create({
  fullView: {
    borderRadius: layoutScale(20),
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  headingStyle: {
    color: "#000000",
    fontSize: appFonts.windowWidth / 70,
    fontWeight: "bold",
    textAlign: "center",
    height: "20%",
    marginTop: scaledHeight(20),
    textAlignVertical: "center"
  },
  parentView: {
    width: "95%",
    height: "35%",
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: layoutScale(0.5),
    borderColor: "grey"
  },
  parentHeading: {
    color: "#000000",
    fontSize: appFonts.windowWidth / 80,
    fontWeight: "bold",
    width: "20%"
  },
  buttonContainer: {
    height: scaledHeight(50),
    borderColor: "#F2F2F2",
    borderRadius: layoutScale(10),
    borderWidth: layoutScale(1),
    backgroundColor: "#dcdcdc",
    width: "100%",
  },
  timeSlotContainer: {
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    height: "30%"
  },
  timeSlotHeading: {
    color: "#000000",
    fontSize: appFonts.windowWidth / 80,
    fontWeight: "bold",
    width: "20%"
  },
  actionContainer: {
    height: "25%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: layoutScale(0.5),
    borderColor: "grey",
    width: "95%"
  },
  bookNowContainer: {
    backgroundColor: appColors.appBackground,
    width: sacledWidth(40),
    height: scaledHeight(50),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: appFonts.windowWidth / 90
  },
  bookHeading: {
    color: appColors.white,
    fontSize: appFonts.windowWidth / 80,
    fontWeight: "bold"
  },
  cancelContainer: {
    backgroundColor: appColors.appBackground,
    width: sacledWidth(40),
    height: scaledHeight(50),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: appFonts.windowWidth / 90
  },
  cancelHeading: {
    color: appColors.white,
    fontSize: appFonts.windowWidth / 80,
    fontWeight: "bold"
  },
  onehourContainer: {
    width: "38%",
    backgroundColor: appColors.appBackground,
    height: scaledHeight(50),
    borderRadius: layoutScale(10),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: layoutScale(8)
  },
  onehourText: {
    color: appColors.white,
    fontSize: appFonts.windowWidth / 90,
    fontWeight: "bold"
  },
  halfHourContainer: {
    width: "100%",
    height: scaledHeight(50),
    flexDirection: "row",
    marginLeft: layoutScale(8)
  },
  firsthalfContainer: {
    width: "38%",
    height: scaledHeight(50),
    borderTopLeftRadius: layoutScale(10),
    borderBottomLeftRadius: layoutScale(10),
    justifyContent: "center",
    alignItems: "center"
  },
  firsthalftext: {
    fontSize: appFonts.windowWidth / 90,
    fontWeight: "bold"
  },
  secondhalfContainer: {
    width: "38%",
    height: scaledHeight(50),
    borderTopRightRadius: layoutScale(10),
    borderBottomRightRadius: layoutScale(10),
    justifyContent: "center",
    alignItems: "center"
  },
});
