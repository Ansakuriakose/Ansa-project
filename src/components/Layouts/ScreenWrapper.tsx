import {
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@app/constants/theme';

type ScreenWrapperType = {
  children: React.ReactNode;
  statusBarStyle?: StatusBarStyle;
  backgroundColor?: string;
  translucent?: boolean;
};

const ScreenWrapper = (props: ScreenWrapperType) => {
  const {
    children,
    backgroundColor = COLORS.white,
    statusBarStyle = 'dark-content',
    translucent = false,
  } = props;
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 0;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: translucent ? 0 : paddingTop,
          backgroundColor: translucent ? 'transparent' : backgroundColor,
        },
      ]}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={translucent ? 'transparent' : backgroundColor}
        translucent={true}
      />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
