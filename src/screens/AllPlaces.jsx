import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
// navigate
import { useIsFocused } from '@react-navigation/native';
import PlacesList from '../components/Place/PlacesList';
import { fetchPlaces } from '../utils/database';

export default function AllPlaces({ route }) {
  const isFocused = useIsFocused();

  const [places, setPlaces] = useState([]);

  const loadPlaces = async () => {
    const placesData = await fetchPlaces();
    setPlaces(placesData);
  };

  useEffect(() => {
    if (isFocused) {
      // setPlaces((curPlaces) => [...curPlaces, route.params]);
      loadPlaces();
    }
  }, [isFocused, route]);

  return <PlacesList places={places} />;
}
