import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { AgendamentoCard, Agendamento } from './AgendamentoCard';

interface AgendamentosListProps {
  agendamentos: Agendamento[];
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

      <View style={styles.list}>
        {agendamentos.map((item) => (
          <AgendamentoCard key={item.id} agendamento={item} />
        ))}
      </View>
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
});
