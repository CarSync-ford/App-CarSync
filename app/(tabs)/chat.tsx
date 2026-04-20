import { Text, View, StyleSheet } from "react-native";

export default function ChatIA() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChatIA</Text>
      <Text>Você está na página do Chat IA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});
