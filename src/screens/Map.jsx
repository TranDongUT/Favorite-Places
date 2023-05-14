import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import IconButton from '../components/UI/IconButton';

export default function Map({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 10.815607,
    longitude: initialLocation ? initialLocation.lng : 106.67189,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSelectLocation = (event) => {
    if (initialLocation) {
      return;
    }
    lat = event.nativeEvent.coordinate.latitude;
    lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      lat: lat,
      lng: lng,
    });
  };

  const handleSavePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No Picked Location', 'Tap on your Map to Pick Location');
      return;
    }

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tinColor }) => (
        <IconButton
          icon='save'
          color={tinColor}
          size={24}
          onPress={handleSavePickedLocation}
        />
      ),
    });
  }, [navigation, handleSavePickedLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleSelectLocation}
    >
      {selectedLocation && (
        <Marker
          title='Picked'
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
