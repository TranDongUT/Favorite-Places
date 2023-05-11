import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

export default function OutlineButton({ children, onPress, icon }) {
  return (
    <Pressable
      android_ripple={{ color: '#cccc' }}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      {/* <View style={styles.button}> */}
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={Colors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
      {/* </View> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: Colors.primary500,
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pressed: {
    opacity: 0.7,
  },

  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
