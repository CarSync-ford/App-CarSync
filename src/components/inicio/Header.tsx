import { FontAwesome6 as FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Constants";
import { NotificationPanel } from "./NotificationPanel";

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <View style={styles.wrapper}>
      <BlurView
        intensity={20}
        tint="Colors.light.background"
        style={styles.container}
      >
        <View style={styles.leftGroup}>
          <View style={styles.profileCircle}>
            <FontAwesome name="user" size={24} color={Colors.cinza} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Milena Marez</Text>
            <Text style={styles.subtitleText}>Ranger Raptor {">"}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.bellContainer}
          onPress={() => setShowNotifications((v) => !v)}
        >
          <FontAwesome name="bell" size={26} color={Colors.light.preto} solid />
          <View style={styles.badge} />
        </TouchableOpacity>
      </BlurView>

      <NotificationPanel visible={showNotifications} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: "rgba(227, 226, 232, 0.85)",
    overflow: "hidden",
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
  },
  nameText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.azul,
  },
  subtitleText: {
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
    color: Colors.light.preto,
    textDecorationLine: "underline",
  },
  bellContainer: {
    position: "relative",
    padding: 5,
  },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.azul,
  },
});
