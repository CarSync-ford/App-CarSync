import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { maskEmail, maskCPFDisplay, maskPhone, maskName } from '@/src/utils/maskData';

type MaskType = 'email' | 'cpf' | 'phone' | 'name';

interface MaskedTextProps {
  value: string;
  type: MaskType;
  style?: object;
}

const maskFunctions: Record<MaskType, (v: string) => string> = {
  email: maskEmail,
  cpf: maskCPFDisplay,
  phone: maskPhone,
  name: maskName,
};

/**
 * MaskedText
 * Renderiza um dado sensível de forma parcialmente oculta.
 * Uso: <MaskedText type="email" value="joao@gmail.com" />
 */
export function MaskedText({ value, type, style }: MaskedTextProps) {
  const masked = maskFunctions[type](value);
  return <Text style={[styles.text, style]}>{masked}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    fontSize: 14,
  },
});
