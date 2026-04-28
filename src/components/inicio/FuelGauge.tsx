import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

interface FuelGaugeProps {
  level: number; 
}

export function FuelGauge({ level }: FuelGaugeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${Math.max(0, Math.min(level, 100))}%` }]} />
        <Text style={styles.levelText}>{level}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
  },
  barBackground: {
    width: '100%',
    height: 28,
    backgroundColor: Colors.cinza,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.vermelho,
  },
  levelText: {
    position: 'absolute',
    right: 16,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000000',
  }
});
