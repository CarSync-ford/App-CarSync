import { NotificationPanel } from "@/src/components/inicio/NotificationPanel";
import { FontAwesome6 as FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from '@/constants/Constants';
import { useState } from "react";
import { useNotifications } from '@/src/contexts/NotificationContext';
import { styles } from './style';

export function ChatHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { notificacoes, temNaoLidas, marcarComoLida } = useNotifications();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { paddingTop: insets.top || 15 }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={20} color={Colors.light.preto} />
        </Pressable>

        <View style={styles.centerGroup}>
          <Image
            source={require('@/assets/images/fordinho_chat.png')}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Fordinho</Text>
            <Text style={styles.subtitle}>Chat IA</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.bellContainer}
          onPress={() => setShowNotifications((v) => !v)}
        >
          <FontAwesome name="bell" size={26} color={Colors.light.preto} solid />
          {temNaoLidas && <View style={styles.badge} />}
        </TouchableOpacity>
      </View>

      <NotificationPanel
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        topOffset={insets.top + 74}
        notificacoes={notificacoes}
        onMarcarComoLida={marcarComoLida}
      />
    </View>
  );
}
