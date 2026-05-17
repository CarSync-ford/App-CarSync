import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '@/constants/Constants';
import { styles } from './style';
import { TirePressureProps } from '@/src/types/inicio';;

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
