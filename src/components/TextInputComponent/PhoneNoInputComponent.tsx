import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Arrow from '@app/assets/icons/ArrowBottom.svg';
import { COLORS, FONTS } from '@app/constants/theme';

type Props = {
  placeholderText: string;
  inputstyle?: ViewStyle;
  textStyle?: TextStyle;
  value?: string;
  onChangeText?: (text: string) => void;
};

const PhoneNoInputComponent = (props: Props) => {
  const { placeholderText, inputstyle, textStyle, value, onChangeText } = props;
  return (
    <View style={{ paddingBottom: 20 }}>
      <Text style={textStyle}>{placeholderText}</Text>

      {/* <TextInput
        style={inputstyle}
        placeholder={placeholderText}
        placeholderTextColor={COLORS.labelText}
      /> */}

      <View
        style={[inputstyle, { flexDirection: 'row', alignItems: 'center' }]}
      >
        <TouchableOpacity style={styles.flexStyle}>
          <Text style={styles.InputTextStyle}> +91 </Text>
          <Arrow />
        </TouchableOpacity>
        <TextInput
          placeholder="8975305673"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export default PhoneNoInputComponent;

const styles = StyleSheet.create({
  flexStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    paddingRight: 10,
    borderColor: COLORS.lightGrey,
  },
  InputTextStyle: { fontSize: 14, fontWeight: 400, ...FONTS.regular },
});
