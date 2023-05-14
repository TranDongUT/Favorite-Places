import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';

export default function LoadingOverlay({ text }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={'#fff'} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginTop: 4,
    fontSize: 16,
    textAlign: 'center',
  },
});
