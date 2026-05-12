import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

interface NovoAgendamentoButtonProps {
  onPress: () => void;
}

export function NovoAgendamentoButton({ onPress }: NovoAgendamentoButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <LinearGradient
        colors={[Colors.degrade.azul_claro, Colors.degrade.azul_escuro]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.container}
      >
        <FontAwesome name="calendar-plus" size={20} color="#FFFFFF" />
        <Text style={styles.text}>NOVO AGENDAMENTO</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
