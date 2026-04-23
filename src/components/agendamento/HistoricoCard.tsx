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
  const statusColor = historico.realizado ? Colors.verde : Colors.vermelho;
  const statusIcon = historico.realizado ? 'circle-check' : 'circle-xmark';
  const statusLabel = historico.realizado ? 'Realizado' : 'Não realizado';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name={statusIcon} size={26} color={statusColor} solid />
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
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#F3F3F3', // Light gray background like Agendamento top
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  iconContainer: {
    alignItems: 'center',
    width: 65,
    gap: 4,
  },
  statusText: {
    fontSize: 9,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: Colors.azul,
  },
  tipoText: {
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
  },
});
