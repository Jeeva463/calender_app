import { StyleSheet } from 'react-native';
import { appFonts } from '../appConstants/fonts';

export default StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  containerHeading: {
    width: "80%",
    flex: 0.18,
    alignItems: "center",
    justifyContent: appFonts.windowWidth >= 768 ? "center" : "flex-end"
  },
  headingText: {
    fontSize: appFonts.windowWidth >= 768 ? 45 : 23,
    fontWeight: "800",
    textAlignVertical: "center",
  },
  parentButton: {
    width: "80%",
    flex: appFonts.windowWidth >= 768 ? 0.06 : 0.08,
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    alignSelf: "center",
  },
  buttonGroupStyle: {
    width: "100%",
    height: "100%",
    padding: 0,
    marginLeft: 0,
    borderTopLeftRadius: appFonts.windowWidth >= 768 ? 25 : 15,
    borderTopRightRadius: appFonts.windowWidth >= 768 ? 25 : 15,
    marginTop: 0
  },
  parentButtonGroup: {
    flex: appFonts.windowWidth >= 768 ? 0.75 : 0.75,
    width: "80%",
    backgroundColor: "#d9dbda",
    flexWrap: "wrap",
    borderBottomLeftRadius: appFonts.windowWidth >= 768 ? 25 : 15,
    borderBottomRightRadius: appFonts.windowWidth >= 768 ? 25 : 15
  },
  headingTextStyle: {
    flex: 0.1,
    width: "100%",
    fontSize: appFonts.windowWidth > 768 ? 25 : 18,
    color: "black",
    fontWeight: "bold",
    marginLeft: appFonts.windowWidth > 768 ? 20 : 20,
    marginTop: appFonts.windowWidth > 768 ? 20 : 20
  },
});
