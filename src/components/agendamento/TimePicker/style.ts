import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    maxHeight: 220,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 2,
  },
  timeItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: Colors.azul_claro + '30',
  },
  timeText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
  },
  selectedText: {
    fontFamily: 'Inter_700Bold',
    color: Colors.azul,
  },
});
