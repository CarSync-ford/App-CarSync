import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface Agendamento {
  id: string;
  data: string;
  horario: string;
  tipo: string;
  local: string;
}

interface AgendamentoCardProps {
  agendamento: Agendamento;
}

export function AgendamentoCard({ agendamento }: AgendamentoCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.dateText}>
          {agendamento.data} - {agendamento.horario}
        </Text>
        <Text style={styles.tipoText}>{agendamento.tipo}</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  dateText: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: Colors.azul,
  },
  tipoText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  localText: {
    flex: 1,
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
    lineHeight: 16,
    marginRight: 10,
  },
  mapButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  mapText: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    color: Colors.azul,
    textDecorationLine: 'underline',
  },
});
