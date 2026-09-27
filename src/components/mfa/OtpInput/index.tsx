import React, { useRef, useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import { styles } from './style';

interface OtpInputProps {
  length?: number;
  value: string;
  onChangeText: (text: string) => void;
}

export default function OtpInput({ length = 6, value, onChangeText }: OtpInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.boxesContainer} onPress={handlePress}>
        {Array(length).fill(0).map((_, index) => {
          const digit = value[index] || '';
          const isCurrentBox = isFocused && value.length === index;
          
          return (
            <View 
              key={index} 
              style={[styles.box, isCurrentBox && styles.boxFocused]}
            >
              <Text style={styles.boxText}>{digit}</Text>
            </View>
          );
        })}
      </Pressable>
      
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={value}
        onChangeText={(t) => {
          if (t.length <= length) {
            onChangeText(t.replace(/[^0-9]/g, ''));
          }
        }}
        keyboardType="number-pad"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={length}
      />
    </View>
  );
}
