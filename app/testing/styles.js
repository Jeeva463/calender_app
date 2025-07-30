import { StyleSheet, Dimensions } from 'react-native';
import {
  layoutScale,
  fontScale,
  sacledWidth,
  scaledHeight,
} from '../utils/adapterUtil';
import { appColors } from '../../appConstants/colors';
import { appFonts } from '../../appConstants/fonts';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const height = windowHeight / 10;

export default StyleSheet.create({
  mainContainer: {
    width: windowWidth,
    height: windowHeight - 10,
    flexDirection: "column",
    borderTopRightRadius: layoutScale(10),
    borderTopLeftRadius: layoutScale(10),
    marginTop: 10
  },
  calenderContainer: {
    flexDirection: "row",
    width: windowWidth,
    height: height,
  },
  hoursView: {
    width: windowWidth / 15,
    height: height,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  hoursText: {
    top: height / 7,
    fontSize: fontScale(25),
    fontWeight: "600",
    color: "#786f6f",
    fontFamily: 'arial'
  },
  parentEvents: {
    width: (windowWidth - (windowWidth / 15)) - 380,
    height: height,
    borderBottomColor: "#bfbbbb",
    overflow: "visible",
    opacity: 0.5,
    zIndex: 2,
    position: 'absolute',
    left: ((windowWidth - (windowWidth / 15)) - 20) / 13
  },
  eventContainer: {
    backgroundColor: "#FF9999",
    borderRadius: layoutScale(10),
    width: '98%',
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    left: layoutScale(5),
    position: "absolute",
    borderLeftWidth: layoutScale(10),
    borderColor: "#008000",
    borderRightWidth: layoutScale(10),
  },
  eventTitle: {
    fontSize: fontScale(27),
    fontWeight: "bold",
    color: "black",
    alignItems: "center"
  }
});
