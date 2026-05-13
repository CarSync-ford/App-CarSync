import { Colors } from "@/constants/Constants";
import { ReactNode } from "react";
import { DimensionValue, StyleSheet, Text, View } from "react-native";
import { styles } from './style';
import { CardProps } from "@/src/interfaces/inicio";

export function Card({ title, icon, width, children, iconColor, height = "auto" }: CardProps) {
  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
            {icon}
          </View>
        )}
      </View>
      {children && <View style={[styles.content, {height: height}]}>{children}</View>}
    </View>
  );
}
