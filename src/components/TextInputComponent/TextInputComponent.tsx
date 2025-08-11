import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '@app/constants/theme';

type Props = {
  placeholderText: string;
  inputstyle?: ViewStyle;
  textStyle?: TextStyle;
  secureTextEntry: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
};

const TextInputComponent = (props: Props) => {
  const {
    placeholderText,
    inputstyle,
    textStyle,
    secureTextEntry,
    value,
    onChangeText,
  } = props;
  return (
    <View style={{ paddingBottom: 20 }}>
      <Text style={textStyle}>{placeholderText}</Text>

      <TextInput
        style={inputstyle}
        placeholder={placeholderText}
        placeholderTextColor={COLORS.labelText}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({});
