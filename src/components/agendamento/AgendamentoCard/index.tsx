import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { IAgendamento } from '@/src/types/agendamento';
import { AgendamentoCardProps } from '@/src/interfaces/agendamento';;

const MAPS_URL = 'https://www.google.com/maps/place/R.+Alagoas,+41+-+Centro,+S%C3%A3o+Caetano+do+Sul+-+SP,+09521-050/@-23.6111276,-46.5797524,18.14z/data=!4m6!3m5!1s0x94ce5c8e9f799e0d:0x12a21d167f9312ba!8m2!3d-23.6110636!4d-46.5792069!16s%2Fg%2F11bw3_yrnx?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D';

function formatarData(data: Date | null | undefined) {
  if (!data) return '00/00/0000';
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getFullYear()}`;
}

export function AgendamentoCard({ agendamento }: AgendamentoCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.dateText}>
          {formatarData(agendamento.data)} - {agendamento.horario}
        </Text>
        <Text style={styles.tipoText}>{agendamento.motivo}</Text>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.localText} numberOfLines={2}>
          Local: {agendamento.local}
        </Text>

        <TouchableOpacity
          style={styles.mapButton}
          activeOpacity={0.7}
          onPress={() => Linking.openURL(MAPS_URL)}
        >
          <FontAwesome name="map-location-dot" size={20} color={Colors.azul} />
          <Text style={styles.mapText}>Clique para abrir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
