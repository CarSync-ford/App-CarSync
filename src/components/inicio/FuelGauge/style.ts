import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
  },
  barBackground: {
    width: '100%',
    height: 28,
    backgroundColor: Colors.cinza,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.vermelho,
  },
  levelText: {
    position: 'absolute',
    right: 16,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000000',
  }
});
