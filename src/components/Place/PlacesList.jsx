import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';

// components
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/GlobalStyles';

export default function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(place) => place.id}
      renderItem={(placeData) => <PlaceItem place={placeData.item} />}
    />
  );
}

const styles = StyleSheet.create({
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
