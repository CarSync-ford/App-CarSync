import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

interface OilLevelProps {
  level: number; 
}

export function OilLevel({ level }: OilLevelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { height: `${Math.max(0, Math.min(level, 100))}%` }]} />
      </View>
      <Text style={styles.levelText}>{level}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 16,
  },
  barBackground: {
    height: "100%",
    width: 32,
    backgroundColor: Colors.cinza,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end', 
  },
  barFill: {
    width: '100%',
    backgroundColor: Colors.verde,
  },
  levelText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000000',
  }
});
