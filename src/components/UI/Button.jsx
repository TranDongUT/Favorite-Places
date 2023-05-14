import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

// constants
import { Colors } from '../../constants/GlobalStyles';

export default function Button({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    color: Colors.primary50,
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});
