import { useEffect, useRef, useState } from "react";
import { Animated, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from './style';
import { Notification } from '@/src/interfaces/inicio';

interface NotificationPanelProps {
  visible: boolean;
  onClose: () => void;
  /** Altura do header em pixels — o painel começará logo abaixo */
  topOffset?: number;
  notificacoes: Notification[];
  onMarcarComoLida: (id: number) => void;
}

type Aba = 'naoLidas' | 'lidas';

export function NotificationPanel({ visible, onClose, topOffset, notificacoes, onMarcarComoLida }: NotificationPanelProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-10)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [aba, setAba] = useState<Aba>('naoLidas');

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

  const lista = notificacoes.filter((n) => (aba === 'naoLidas' ? !n.lida : n.lida));

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

        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabButton, aba === 'naoLidas' && styles.tabButtonActive]}
            onPress={() => setAba('naoLidas')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, aba === 'naoLidas' && styles.tabTextActive]}>
              Não lidas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, aba === 'lidas' && styles.tabButtonActive]}
            onPress={() => setAba('lidas')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, aba === 'lidas' && styles.tabTextActive]}>
              Lidas
            </Text>
          </TouchableOpacity>
        </View>

        {lista.length === 0 && (
          <Text style={styles.emptyText}>
            {aba === 'naoLidas' ? 'Nenhuma notificação nova.' : 'Nenhuma notificação lida.'}
          </Text>
        )}

        {lista.map((n, i) => (
          <TouchableOpacity
            key={n.id}
            style={[styles.item, i === lista.length - 1 && styles.itemLast]}
            onPress={() => onMarcarComoLida(n.id)}
            activeOpacity={aba === 'naoLidas' ? 0.6 : 1}
          >
            <Text style={styles.text}>
              {n.segments.map((s, j) => (
                <Text key={j} style={s.highlight ? styles.textHighlight : undefined}>
                  {s.text}
                </Text>
              ))}
            </Text>
            <Text style={styles.time}>{n.time}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </Modal>
  );
}
