import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 0,
    marginTop: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 13,
    color: '#1F2937'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pillNormal: {
    backgroundColor: Colors.cinza, 
  },
  pillWarning: {
    backgroundColor: Colors.amarelo, 
  },
  pillLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  pillValue: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  textNormal: {
    color: '#4B5563', 
  },
  textWarning: {
    color: '#FFFFFF', 
  }
});
