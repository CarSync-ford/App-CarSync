import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: 140,
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: Colors.azul,
    lineHeight: 52, 
  },
  unitText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
});
