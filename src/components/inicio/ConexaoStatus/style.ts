import { Colors } from '@/constants/Constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.cinza,
    textAlign: 'center',
  },
});
