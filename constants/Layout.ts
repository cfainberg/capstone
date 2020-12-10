import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const responsiveHeight = percentage => height * percentage / 100;
const responsiveWidth = percentage => width * percentage / 100;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  responsiveHeight,
  responsiveWidth,
};
