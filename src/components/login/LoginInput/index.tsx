import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { styles } from './style';
import { Colors } from '@/constants/Constants';
import { Ionicons } from '@expo/vector-icons';

interface LoginInputProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
}

export default function LoginInput({ label, isPassword = false, ...rest }: LoginInputProps) {
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.light.cinza}
          secureTextEntry={isSecure}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity style={styles.icon} onPress={() => setIsSecure(!isSecure)}>
            <Ionicons name={isSecure ? "eye-off-outline" : "eye-outline"} size={20} color={Colors.light.cinza} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
