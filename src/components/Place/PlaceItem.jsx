import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/GlobalStyles';

export default function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      android_ripple={{ color: '#cccc' }}
      style={({ pressed }) => [styles.place, pressed && styles.pressed]}
      onPress={() => onSelect(place.id)}
    >
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title ?? 'ABC'}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  place: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    backgroundColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
