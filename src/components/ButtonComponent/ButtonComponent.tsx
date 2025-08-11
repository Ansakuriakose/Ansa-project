import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { Children } from 'react';
import { COLORS } from '@app/constants/theme';
import { wp } from '@app/constants/common';

type Props = {
  children: React.ReactNode;
  buttonStyle?: ViewStyle;
  onPress: () => void;
};

const ButtonComponent = (props: Props) => {
  const { children, buttonStyle, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, buttonStyle]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: wp(50),
    height: wp(50),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
