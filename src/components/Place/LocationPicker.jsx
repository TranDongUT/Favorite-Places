import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';

import OutlineButton from '../UI/OutlineButton';
import { Colors } from '../../constants/GlobalStyles';
import {
  PermissionStatus,
  useForegroundPermissions,
  getCurrentPositionAsync,
} from 'expo-location';
import { getAddress, getMapPreview } from '../../utils/location';

export default function LocationPicker({ onPickLocation }) {
  const route = useRoute();
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [pickedLocation, setPickedLocation] = useState();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermisson = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficiant Permission',
        'Need to grant Camera Permission to use this app'
      );
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (route.params && isFocused) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  const handleGetLocate = async () => {
    const hasPermission = await verifyPermisson();
    if (!hasPermission) {
      return;
    }
    try {
      const location = await getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePickOnMap = () => {
    navigation.navigate('Map');
  };

  let mapPreview = <Text>No Location picked yet.</Text>;

  if (pickedLocation) {
    mapPreview = (
      <Image
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
        style={styles.image}
      />
    );
  }

  const fetchAddress = async () => {
    let addressData = 'Location address';
    try {
      addressData = await getAddress(pickedLocation.lat, pickedLocation.lng);
    } catch (error) {
      console.log(error);
    }
    onPickLocation({ ...pickedLocation, address: addressData });
  };

  useEffect(() => {
    if (pickedLocation) {
      fetchAddress();
    }
  }, [pickedLocation, onPickLocation]);

  return (
    <View>
      <View style={styles.mapPreview}>{mapPreview}</View>
      <View style={styles.actions}>
        <OutlineButton icon='location' onPress={handleGetLocate}>
          Locate User
        </OutlineButton>
        <OutlineButton icon='map' onPress={handlePickOnMap}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
