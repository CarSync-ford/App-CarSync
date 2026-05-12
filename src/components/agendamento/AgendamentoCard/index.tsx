import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { IAgendamento, AgendamentoCardProps } from "@/src/interfaces/agendamento";

export function AgendamentoCard({ agendamento }: AgendamentoCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.dateText}>
          {agendamento.data?.getDate()}/{agendamento.data?.getMonth() + 1}/{agendamento.data?.getFullYear()} - {agendamento.horario}
        </Text>
        <Text style={styles.tipoText}>{agendamento.motivo}</Text>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.localText} numberOfLines={2}>
          Local: {agendamento.local}
        </Text>

        <TouchableOpacity style={styles.mapButton} activeOpacity={0.7}>
          <FontAwesome name="map-location-dot" size={20} color={Colors.azul} />
          <Text style={styles.mapText}>Clique para abrir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
