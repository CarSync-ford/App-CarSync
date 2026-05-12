import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: Colors.light.branco_cards_agenda, // Light gray background like Agendamento top
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.light.borda_cards_agenda,
  },
  iconContainer: {
    alignItems: 'center',
    width: 65,
    gap: 2,
  },
  statusText: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.azul,
  },
  tipoText: {
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
  },
});
