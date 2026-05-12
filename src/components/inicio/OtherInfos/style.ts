import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4, 
    gap: 4,
  },
  label: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  value: {
    fontSize: 12,
    color: Colors.roxo,
    fontWeight: 'bold',
  }
});
