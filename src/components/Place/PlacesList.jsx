import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';

// components
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';

export default function PlacesList({ places }) {
  const navigation = useNavigation();

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  const handleSelectPlaceId = (id) => {
    navigation.navigate('PlaceDetail', {
      placeId: id,
    });
  };

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(place) => {
        return place.id;
      }}
      renderItem={(placeData) => (
        <PlaceItem place={placeData.item} onSelect={handleSelectPlaceId} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },

  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
