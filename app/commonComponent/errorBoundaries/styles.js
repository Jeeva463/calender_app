import {StyleSheet} from 'react-native';
import { appColors } from '../../appConstants/colors';
import { fontScale, sacledWidth, scaledHeight } from '../../utils/adapterUtil';

export default StyleSheet.create({
  warningImageContainer: {
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningImage: {
    marginTop: scaledHeight(40),
    marginBottom: scaledHeight(40),
  },
  warningTextContainer: {
    flexDirection: 'row',
    height: scaledHeight(100),
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  WarningText: {
    // fontFamily: 'Roboto-Regular',
    fontSize: fontScale(20),
    // textAlign: 'center',
    color: 'rgb(66,66,66)',
    // fontFamily: FontFamily.primaryFontFamily,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'green',
    marginTop: scaledHeight(30),
  },
  okButton: {
    width: sacledWidth(140),
    height: scaledHeight(50),
    borderRadius: sacledWidth(4),
    borderColor: appColors.btnBg,
    borderWidth: 1,
    backgroundColor: appColors.btnBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: sacledWidth(15),
  },
  doneText: {
    color: 'rgb(255,255,255)',
    fontSize: fontScale(15),
    // fontFamily: FontFamily.primaryFontFamily,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
