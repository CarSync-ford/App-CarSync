import { Colors } from "@/constants/Constants";
import { FontAwesome6 as FontAwesome } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Historico, HistoricoCard } from "./HistoricoCard";

interface HistoricoListProps {
  historicos: Historico[];
}

export function HistoricoList({ historicos }: HistoricoListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.iconContainer}>
          <FontAwesome name="calendar-days" size={16} color="#3C3737" solid />
        </View>
        <Text style={styles.title}>Histórico</Text>
      </View>

      <ScrollView
        style={{flex: 1 }}  // ADICIONADO: Isso trava o ScrollView dentro do maxHeight de 300 e ativa a rolagem
        contentContainerStyle={{ gap: 8, paddingBottom: 10 }} 
        nestedScrollEnabled={true}
      >
        {historicos.map((item) => (
          <HistoricoCard key={item.id} historico={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 40,
    height: 300,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#A1BCE1",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: Colors.light.preto,
  },
});
