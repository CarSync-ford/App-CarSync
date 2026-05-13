import { FontAwesome6 as FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from '@/constants/Constants';
import { NotificationPanel } from "../NotificationPanel";
import { useAuth } from '@/src/contexts/AuthContext';
import { styles } from './style';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { signOut } = useAuth();

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

        <View style={styles.rightGroup}>
          <TouchableOpacity
            style={styles.bellContainer}
            onPress={() => setShowNotifications((v) => !v)}
          >
            <FontAwesome name="bell" size={26} color={Colors.light.preto} solid />
            <View style={styles.badge} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <FontAwesome name="right-from-bracket" size={24} color={Colors.light.preto} />
          </TouchableOpacity>
        </View>
      </BlurView>

      <NotificationPanel visible={showNotifications} />
    </View>
  );
}
