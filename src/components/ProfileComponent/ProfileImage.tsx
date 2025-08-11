import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Camera from '@app/assets/icons/Camera.svg';
import { ProfileImg } from '@app/constants/static';

type Props = {
  url: string;
};

const ProfileImage = (props: Props) => {
  const { url } = props;
  return (
    <View style={styles.imagecontainer}>
      <View style={styles.profileImgSubContainer}>
        <Image style={styles.profileImg} source={ProfileImg} />
      </View>
      <TouchableOpacity style={styles.cameraBtn}>
        <Camera />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  imagecontainer: {
    width: 102,
    height: 102,
    borderRadius: 51,
    // marginLeft: 20,
    position: 'relative',
  },
  profileImgSubContainer: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  cameraBtn: {
    padding: 5,
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
