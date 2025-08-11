import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Close from '@app/assets/icons/Close_round.svg';
import { FONTS } from '@app/constants/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
  children: React.ReactNode;
  visible: boolean;
  heading: string;
  onPressClose: any;
}

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const CommonBottomSheet = forwardRef(
  ({ children, visible, heading, onPressClose }: Props, ref) => {
    const translateY = useSharedValue(0);
    const isActive = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      isActive.value = destination !== 0;
      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    useImperativeHandle(ref, () => ({
      scrollTo,
    }));

    useEffect(() => {
      if (visible) {
        scrollTo(MAX_TRANSLATE_Y);
      } else {
        scrollTo(0);
      }
    }, [visible, scrollTo]);

    const panGesture = Gesture.Pan()
      .onUpdate(event => {
        if (event.translationY < 0) {
          translateY.value = event.translationY;
        }
      })
      .onEnd(() => {
        if (translateY.value < -SCREEN_HEIGHT / 3) {
          scrollTo(MAX_TRANSLATE_Y);
        } else {
          scrollTo(0);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    return (
      <>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[styles.bottomSheetContainer, rBottomSheetStyle]}
          >
            <View style={styles.line} />
            <View style={styles.headingStyle}>
              <Text style={styles.headingText}>{heading}</Text>
              <TouchableOpacity onPress={() => onPressClose()}>
                <Close />
              </TouchableOpacity>
            </View>
            {visible && children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);

export default CommonBottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  headingStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 500,
    ...FONTS.medium,
  },
});
