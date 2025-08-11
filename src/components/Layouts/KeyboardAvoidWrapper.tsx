import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  props?: any;
  contentContainerStyle?: ViewStyle;
};

const KeyboardAvoidWrapper: React.FC<Props> = ({
  children,
  props,
  contentContainerStyle,
}) => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, ...contentContainerStyle }}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoidWrapper;
