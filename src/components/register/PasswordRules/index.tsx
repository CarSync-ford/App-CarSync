import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface PasswordRulesProps {
  password: string;
}

const PASSWORD_RULES: { label: string; test: (p: string) => boolean }[] = [
  { label: 'Mínimo de 8 caracteres',  test: (p) => p.length >= 8 },
  { label: 'Uma letra maiúscula',     test: (p) => /[A-Z]/.test(p) },
  { label: 'Uma letra minúscula',     test: (p) => /[a-z]/.test(p) },
  { label: 'Um número',               test: (p) => /[0-9]/.test(p) },
  { label: 'Um caractere especial',   test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export default function PasswordRules({ password }: PasswordRulesProps) {
  return (
    <View style={styles.container}>
      {PASSWORD_RULES.map((rule) => {
        const met = rule.test(password);
        return (
          <View key={rule.label} style={styles.row}>
            <Text style={[styles.dot, met && styles.dotMet]}>
              {met ? '✓' : '•'}
            </Text>
            <Text style={[styles.text, met && styles.textMet]}>
              {rule.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -4,
    marginBottom: 8,
    paddingHorizontal: 4,
    gap: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    fontSize: 13,
    color: '#8A8A8A',
    width: 14,
    textAlign: 'center',
  },
  dotMet: {
    color: '#52C41A',
    fontWeight: '700',
  },
  text: {
    fontSize: 12,
    color: '#8A8A8A',
  },
  textMet: {
    color: '#52C41A',
  },
});
