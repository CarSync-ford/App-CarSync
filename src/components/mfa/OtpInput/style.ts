import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  box: {
    flex: 1,
    aspectRatio: 0.85,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  boxFocused: {
    borderColor: Colors.azul,
    borderWidth: 2,
  },
  boxText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.preto,
  }
});
