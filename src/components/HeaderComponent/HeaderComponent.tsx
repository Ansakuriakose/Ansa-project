import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '@app/constants/theme';
import { wp } from '@app/constants/common';
import BackButton from '@app/assets/icons/Expand_left.svg';
import { navigateBack } from '@app/services/navigationService';
type Props = {
  label: string;
};

const HaederComponent = (props: Props) => {
  const { label } = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.secContainer}>
        <TouchableOpacity onPress={navigateBack}>
          <BackButton />
        </TouchableOpacity>
        <View style={styles.headerView}>
          <Text style={styles.textStyle}>{label}</Text>
        </View>
      </View>
    </View>
  );
};

export default HaederComponent;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    // height: wp(140),
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 23,
    borderBottomRightRadius: 23,
  },
  secContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(20),
    marginBottom: wp(20),
    // flex: 1,
  },
  headerView: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 500,
    ...FONTS.medium,
    // textAlign: 'center',
  },
});
