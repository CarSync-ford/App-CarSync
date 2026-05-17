import { Colors } from "@/constants/Constants";
import { FontAwesome6 as FontAwesome } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { HistoricoCard } from "../HistoricoCard";
import { styles } from './style';
import { Historico } from '@/src/types/agendamento';
import { HistoricoListProps } from '@/src/interfaces/agendamento';;

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
