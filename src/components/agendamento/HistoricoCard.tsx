import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export interface Historico {
  id: string;
  data: string;
  tipo: string;
  realizado: boolean;
}

interface HistoricoCardProps {
  historico: Historico;
}

export function HistoricoCard({ historico }: HistoricoCardProps) {
  const statusColor = historico.realizado ? "#58BF4A" : "#EE8385";
  const statusIcon = historico.realizado ? 'circle-check' : 'circle-xmark';
  const statusLabel = historico.realizado ? 'Realizado' : 'Não realizado';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name={statusIcon} size={22} color={statusColor} solid />
        <Text style={[styles.statusText, { color: statusColor }]}>
          {statusLabel}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.dateText}>
          {historico.data} 
          <Text style={styles.tipoText}> - {historico.tipo}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: Colors.light.branco_cards_agenda, // Light gray background like Agendamento top
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.light.borda_cards_agenda,
  },
  iconContainer: {
    alignItems: 'center',
    width: 65,
    gap: 2,
  },
  statusText: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.azul,
  },
  tipoText: {
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
  },
});
