import { useEffect, useRef } from "react";
import { Animated, Modal, Text, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from '@/constants/Constants';
import { styles } from './style';
import { Notification } from '@/src/interfaces/inicio';;
import { notificacoesMock } from '@/src/data/notificacoesMock';


interface NotificationPanelProps {
  visible: boolean;
  onClose: () => void;
  /** Altura do header em pixels — o painel começará logo abaixo */
  topOffset?: number;
}

export function NotificationPanel({ visible, onClose, topOffset }: NotificationPanelProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-10)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Posição padrão: status bar + conteúdo típico do header (64px)
  const panelTop = topOffset ?? insets.top + 64;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: visible ? 0 : -10,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Overlay transparente — fecha ao tocar fora */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Painel posicionado logo abaixo do header */}
      <Animated.View
        style={[styles.panel, { top: panelTop, opacity, transform: [{ translateY }] }]}
      >
        <Text style={styles.title}>Notificações</Text>
        {notificacoesMock.map((n, i) => (
          <View
            key={n.id}
            style={[styles.item, i === notificacoesMock.length - 1 && styles.itemLast]}
          >
            <Text style={styles.text}>
              {n.segments.map((s, j) => (
                <Text key={j} style={s.highlight ? styles.textHighlight : undefined}>
                  {s.text}
                </Text>
              ))}
            </Text>
            <Text style={styles.time}>{n.time}</Text>
          </View>
        ))}
      </Animated.View>
    </Modal>
  );
}
