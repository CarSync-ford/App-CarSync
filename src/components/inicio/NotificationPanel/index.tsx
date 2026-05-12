import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Colors } from '@/constants/Constants';
import { styles } from './style';

type Segment = { text: string; highlight?: boolean };
type Notification = { id: number; segments: Segment[]; time: string };

const notifications: Notification[] = [
  {
    id: 1,
    segments: [
      { text: "A pressão do " },
      { text: "pneu dianteiro", highlight: true },
      { text: " direito está abaixo do esperado" },
    ],
    time: "09:40",
  },
  {
    id: 2,
    segments: [
      { text: "Você tem um " },
      { text: "agendamento", highlight: true },
      { text: " para amanhã" },
    ],
    time: "09:40",
  },
];

export function NotificationPanel({ visible }: { visible: boolean }) {
  const translateY = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: visible ? 0 : -5,
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
    <Animated.View
      pointerEvents={visible ? "auto" : "none"}
      style={[styles.panel, { opacity, transform: [{ translateY }] }]}
    >
      <Text style={styles.title}>Notificações</Text>
      {notifications.map((n, i) => (
        <View
          key={n.id}
          style={[
            styles.item,
            i === notifications.length - 1 && styles.itemLast,
          ]}
        >
          <Text style={styles.text}>
            {n.segments.map((s, i) => (
              <Text
                key={i}
                style={s.highlight ? styles.textHighlight : undefined}
              >
                {s.text}
              </Text>
            ))}
          </Text>
          <Text style={styles.time}>{n.time}</Text>
        </View>
      ))}
    </Animated.View>
  );
}
