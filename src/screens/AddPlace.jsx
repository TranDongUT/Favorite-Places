import { View, Text } from 'react-native';
import React from 'react';
import PlaceForm from '../components/Place/PlaceForm';
import { insertPlace } from '../utils/database';

export default function AddPlace({ navigation }) {
  const handleCreatePlace = async (place) => {
    await insertPlace(place);
    console.log('add');
    navigation.navigate('AllPlaces');
  };

  return <PlaceForm onCreatePlace={handleCreatePlace} />;
}
