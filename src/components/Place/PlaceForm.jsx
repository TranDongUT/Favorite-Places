import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';

// constants
import { Colors } from '../../constants/GlobalStyles';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import { Place } from '../../models/place';

export default function PlaceForm({ onCreatePlace }) {
  const [title, setTitle] = useState('');
  const handleChangeTitle = (value) => {
    setTitle(value);
  };

  const [selectedImage, setSelectedImage] = useState();

  const handleTakeImage = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const [pickedLocation, setPickedLocation] = useState();
  const handlePickLocation = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const handleAddPlace = () => {
    const placeData = new Place(title, selectedImage, pickedLocation, 1);
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={handleChangeTitle}
        />
      </View>
      <ImagePicker onTakeImage={handleTakeImage} />
      <LocationPicker onPickLocation={handlePickLocation} />

      <Button onPress={handleAddPlace}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },

  label: {
    fontWeight: 'bold',
    color: Colors.primary500,
    marginBottom: 8,
  },

  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: Colors.primary100,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
  },
});
