import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 16,
  },
  barBackground: {
    height: "100%",
    width: 32,
    backgroundColor: Colors.cinza,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end', 
  },
  barFill: {
    width: '100%',
    backgroundColor: Colors.verde,
  },
  levelText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000000',
  }
});
