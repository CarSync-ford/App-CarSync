import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { AgendamentoCard, IAgendamento } from './AgendamentoCard';

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    maxHeight: 300,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#58C97AB3', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: Colors.light.preto,
  },
  list: {
    gap: 8,
  },
  mensagem: {
    fontSize: 16,
    color: Colors.light.preto,
  }
});
