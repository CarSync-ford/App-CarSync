import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  inputWrapper: {
    flex: 1,
    minHeight: 50,
    backgroundColor: '#EDEDED',
    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 12,
    borderColor: '#DADADA',
    borderWidth: 2,
  },
  input: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 17,
    maxHeight: 100, // Limita altura se for multiline futuramente
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 20,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.azul,
    shadowColor: Colors.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.cinza,
    shadowOpacity: 0,
    elevation: 0,
  },
});
