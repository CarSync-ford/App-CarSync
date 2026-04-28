import { Colors } from "@/constants/Constants";
import { ReactNode } from "react";
import { DimensionValue, StyleSheet, Text, View } from "react-native";

interface CardProps {
  title: string;
  icon?: ReactNode;
  width: DimensionValue;
  children?: ReactNode;
  iconColor: string;
  height?: DimensionValue;
}

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.52)",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.preto,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});