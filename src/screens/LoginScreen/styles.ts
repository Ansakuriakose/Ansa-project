import { normalizeFontSize, wp } from '@app/constants/common';
import { COLORS, FONTS } from '@app/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: wp(50),
  },
  imgStyle: {
    width: wp(143),
    height: wp(143),
    marginTop: wp(138),
  },
  welcomeText: {
    fontSize: normalizeFontSize(31),
    ...FONTS.medium,
    color: COLORS.black,
    marginTop: wp(40),
  },
  imageTextView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    fontSize: 14,
    ...FONTS.light,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.primaryBorder,
    borderWidth: 1,
    borderRadius: 10,
    // marginBottom: 20,
    paddingHorizontal: 20,
    height: wp(50),
    gap: 10,
  },
  input: {
    flex: 1,
    // height: 50,
    fontSize: 12,
    color: COLORS.greyText,
    ...FONTS.regular,
    fontWeight: 400,
  },
  formMainContainer: {
    // padding: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
  mainText: {
    fontSize: 14,
    color: COLORS.labelText,
    fontWeight: 500,
    ...FONTS.medium,
    marginBottom: wp(5),
    marginTop: wp(20),
  },
  buttonStyle: {
    marginHorizontal: wp(20),
    gap: wp(10),
  },
  formContainer: {
    padding: wp(20),
    marginBottom: 20,
  },
  signInText: {
    fontWeight: 500,
    fontSize: 16,
    ...FONTS.medium,
  },
  forgotContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  ForgotText: {
    fontSize: 12,
    fontWeight: 400,
    ...FONTS.regular,
    textDecorationLine: 'underline',
  },
  error: {
    color: COLORS.red,
    marginTop: wp(5),
  },
});
