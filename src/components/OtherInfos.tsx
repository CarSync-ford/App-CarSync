import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

interface InfoItem {
  label: string;
  value: string | number;
}

interface OtherInfosProps {
  infos: InfoItem[];
}

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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4, 
    gap: 4,
  },
  label: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  value: {
    fontSize: 12,
    color: Colors.roxo,
    fontWeight: 'bold',
  }
});
