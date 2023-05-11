import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

import { Colors } from '../../constants/GlobalStyles';
import OutlineButton from '../UI/OutlineButton';

export default function ImagePicker() {
  const [pickedImage, setPickedImage] = useState('');
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermisson = async () => {
    // check device have permission grant or not yet for first time
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficiant Permission',
        'Need to grant Camera Permission to use this app'
      );
      return false;
    }
    return true;
  };

  const handleTakeImage = async () => {
    const hasPermission = await verifyPermisson();

    if (!hasPermission) {
      return;
    }

    try {
      const image = await launchCameraAsync({
        quality: 0.5,
        allowsEditing: true,
        aspect: [16, 9],
      });

      setPickedImage(image.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };

  let ImagePreview = <Text>No image picked yet</Text>;

  if (pickedImage) {
    ImagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{ImagePreview}</View>
      <OutlineButton onPress={handleTakeImage} icon='camera'>
        Take Image
      </OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },
});
