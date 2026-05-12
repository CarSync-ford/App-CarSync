import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { styles } from './style';

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
