import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

interface TirePressureProps {
  fl: number;
  fr: number;
  rl: number;
  rr: number;
}

export function TirePressure({ fl, fr, rl, rr }: TirePressureProps) {
  
  const Pill = ({ label, value }: { label: string, value: number }) => {
    const isWarning = value <= 28;
    return (
      <View style={[styles.pill, isWarning ? styles.pillWarning : styles.pillNormal]}>
        <Text style={[styles.pillLabel, isWarning ? styles.textWarning : styles.textNormal]}>{label}</Text>
        <Text style={[styles.pillValue, isWarning ? styles.textWarning : styles.textNormal]}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Dianteiro</Text>
      <View style={styles.row}>
        <Pill label="E" value={fl} />
        <Pill label="D" value={fr} />
      </View>

      <Text style={styles.sectionTitle}>Traseiro</Text>
      <View style={styles.row}>
        <Pill label="E" value={rl} />
        <Pill label="D" value={rr} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 0,
    marginTop: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 13,
    color: '#1F2937'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pillNormal: {
    backgroundColor: Colors.cinza, 
  },
  pillWarning: {
    backgroundColor: Colors.amarelo, 
  },
  pillLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  pillValue: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  textNormal: {
    color: '#4B5563', 
  },
  textWarning: {
    color: '#FFFFFF', 
  }
});
