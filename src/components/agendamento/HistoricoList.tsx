import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { HistoricoCard, Historico } from './HistoricoCard';

interface HistoricoListProps {
  historicos: Historico[];
}

export function HistoricoList({ historicos }: HistoricoListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.iconContainer}>
          <FontAwesome name="calendar-days" size={16} color="#FFFFFF" solid />
        </View>
        <Text style={styles.title}>Histórico</Text>
      </View>

      <View style={styles.list}>
        {historicos.map((item) => (
          <HistoricoCard key={item.id} historico={item} />
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
    marginBottom: 40,
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
    backgroundColor: '#7D8FA4', // slate gray from image
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
