import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/Constants";

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

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 24,
    zIndex: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    color: Colors.azul,
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    gap: 14,
    borderBottomColor: Colors.cinza,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  itemLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.light.preto,
  },
  time: {
    fontSize: 14,
    color: Colors.light.cinza,
    fontFamily: "Inter_600SemiBold",
  },
  textHighlight: {
    color: Colors.amarelo,
  },
});
