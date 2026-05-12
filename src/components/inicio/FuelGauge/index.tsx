import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '@/constants/Constants';
import { styles } from './style';

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
