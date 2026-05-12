import { Colors } from "@/constants/Constants";
import { FontAwesome6 as FontAwesome } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Historico, HistoricoCard } from "../HistoricoCard";
import { styles } from './style';

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
