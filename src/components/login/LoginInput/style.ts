import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: Colors.azul,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.branco_cards_agenda,
    borderWidth: 1,
    borderColor: Colors.light.borda_cards_agenda,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  input: {
    flex: 1,
    color: Colors.light.preto,
    fontSize: 16,
  },
  icon: {
    padding: 4,
  }
});
