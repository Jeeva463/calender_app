import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { layoutScale} from '../utils/adapterUtil';
import { appColors } from '../appConstants/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const height1 = (windowHeight - StatusBar.currentHeight) / 15;
const height2 = ((windowHeight - height1)) /* - scaledHeight(120) */;
const height3 = windowHeight - height2 - height1;

export default StyleSheet.create({
    parentContainerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  fullView: {
    flex: 1,
    flexDirection: 'row',
    width: windowWidth,
    height: windowHeight,
  },
  level1Container: {
    width: windowWidth / 3.5,
    backgroundColor: appColors.appBackground,
    alignItems: 'center',
  },
  logoContainer: {
    // alignSelf: 'flex-start',
    //backgroundColor: "green",
    backgroundColor: appColors.appBackground,
    flex: 0.25,
    width: '50%'
  },
  leftPanel: {
    flex: 1,
    width: '90%',
  },
  panelHeading: {
    fontSize: windowWidth / 45,
    color: appColors.white,
    fontWeight: 'bold',
    fontFamily: "sans-serif",
    textTransform:"capitalize"
  },
  panelSubHeading: {
    fontSize: windowWidth / 60,
    color: appColors.white,
    fontWeight: '800',
    fontFamily: "sans-serif",
  },
  rightPanel: {
    width: windowWidth - (windowWidth / 3.5),
    //backgroundColor: "red",
    justifyContent: "center",
    flex: 1,
  },
  firstRightPanel: {
    height: height1,
    //backgroundColor: 'red',
    width: windowWidth - (windowWidth / 3.5),
    justifyContent: 'center',
  },
  rightPanelHeading: {
    height: height1,
    fontSize: windowWidth / 50,
    color: '#383636',
    textAlign: "center",
  },
  thirdRightPanel: {
    height: height3,
    alignItems: "center",
  },
  secondRightPanel: {
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth - (windowWidth / 3.5),
    //backgroundColor: 'green',
    borderTopRightRadius: layoutScale(10),
    borderTopLeftRadius: layoutScale(10),
  },
  calenderContainer: {
    width: (windowWidth - (windowWidth / 3.5)),
    height: "100%",
    borderTopRightRadius: layoutScale(10),
    borderTopLeftRadius: layoutScale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
  },
  bookingContainer: {
    width: "50%",
    height: "50%",
    borderRadius: layoutScale(20),
    position: "absolute",
    backgroundColor: "white",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    justifyContent: "center",
    borderWidth: 10,
    borderColor: "#bdb9b9"
  }
});
