import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

// constants
import { Colors } from '../../constants/GlobalStyles';
import ImagePicker from './ImagePicker';

export default function PlaceForm() {
  const [title, setTitle] = useState('');
  const handleChangeTitle = (value) => {
    setTitle(value);
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
      <ImagePicker />
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
