import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '@/constants/Constants';
import { styles } from './style';
import { SpeedChartProps } from '@/src/types/inicio';;

export function SpeedChart({ speed, maxSpeed = 220 }: SpeedChartProps) {
  const size = 140;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(speed / maxSpeed, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={[styles.container, { width: '100%', aspectRatio: 1 }]}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.azul_claro}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.azul}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.speedText}>{speed}</Text>
        <Text style={styles.unitText}>Km/h</Text>
      </View>
    </View>
  );
}
