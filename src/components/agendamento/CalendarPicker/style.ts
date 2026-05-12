import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.azul,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  dayTextFaded: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.cinza,
  },
  selectedDay: {
    backgroundColor: Colors.azul,
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
});
