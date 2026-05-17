import { Colors } from '@/constants/Constants';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';
import { OilLevelProps } from '@/src/types/inicio';;

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
