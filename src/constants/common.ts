import {Dimensions, PixelRatio} from 'react-native';

const {width: deviceWidth, height: deviceHight} = Dimensions.get('window');

const baseWidth = 375; // Example: Width of iPhone X
const scale = deviceWidth / baseWidth;

const hp = (value: any) => {
  const elemHeight = typeof value === 'number' ? value : parseFloat(value);
  const ph = PixelRatio.roundToNearestPixel((deviceHight * elemHeight) / 100);

  return typeof value === 'number' ? ph / 4.2 : ph;
};
const wp = (value: any) => {
  const elemWidth = typeof value === 'number' ? value : parseFloat(value);
  const pw = PixelRatio.roundToNearestPixel((deviceWidth * elemWidth) / 100);
  return typeof value === 'number' ? pw / 4.2 : pw;
};

const normalizeFontSize = (value: number) => {
  return Math.round(value * scale);
};

export {hp, wp, normalizeFontSize, deviceWidth, deviceHight};
