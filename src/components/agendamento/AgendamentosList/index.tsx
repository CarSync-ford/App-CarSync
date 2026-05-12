import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { Text, View, ScrollView } from 'react-native';
import { AgendamentoCard, IAgendamento } from './AgendamentoCard';
import { styles } from './style';

interface AgendamentosListProps {
  agendamentos: IAgendamento[];
}

export function AgendamentosList({ agendamentos }: AgendamentosListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.iconContainer}>
          <FontAwesome name="calendar-check" size={16} color={Colors.light.preto} solid />
        </View>
        <Text style={styles.title}>Agendamentos</Text>
      </View>

      <ScrollView style={styles.list}>
        {agendamentos.length != 0 ?agendamentos.map((item) => (
          <AgendamentoCard key={item.id} agendamento={item} />
        )) : <Text style={styles.mensagem}>Você não tem nenhum agendamento marcado</Text>}
      </ScrollView>
    </View>
  );
}
