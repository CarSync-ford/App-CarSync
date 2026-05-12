import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    maxHeight: 250,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.light.preto,
    marginBottom: 6,
    marginTop: 4,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 4,
  },
  closestItem: {
    borderColor: Colors.amarelo,
    backgroundColor: Colors.amarelo + '10',
  },
  selectedItem: {
    borderColor: Colors.azul_claro,
    backgroundColor: Colors.azul_claro + '15',
  },
  distanceText: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: Colors.light.preto,
  },
  addressText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
  },
});
