import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import OutlineButton from '../components/UI/OutlineButton';
import { Colors } from '../constants/GlobalStyles';
import { fetchPlaceDetail } from '../utils/database';
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function PlaceDetail({ route, navigation }) {
  const selectedPlaceId = route.params.placeId;

  const [fetchedPlace, setFetchedPlace] = useState();
  const loadPlaceDetail = async () => {
    try {
      const placeData = await fetchPlaceDetail(selectedPlaceId);
      setFetchedPlace(placeData);

      navigation.setOptions({
        title: placeData.title,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowOnMap = () => {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  };

  useEffect(() => {
    loadPlaceDetail();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return <LoadingOverlay text='Loading place...' />;
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon='map' onPress={handleShowOnMap}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },

  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  addressContainer: {
    padding: 20,
  },

  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
