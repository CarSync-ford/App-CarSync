import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '@/constants/Constants';
import { styles } from './style';
import { InfoItem } from '@/src/types/inicio';
import { OtherInfosProps } from '@/src/interfaces/inicio';;

export function OtherInfos({ infos }: OtherInfosProps) {
  return (
    <View style={styles.container}>
      {infos.map((item, idx) => (
        <View key={idx} style={styles.row}>
          <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">{item.label}:</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}
