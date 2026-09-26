import { ActivityIndicator, Text, View } from 'react-native';
import { Colors } from '@/constants/Constants';
import { styles } from './style';

interface ConexaoStatusProps {
  status: 'idle' | 'connecting';
}

export function ConexaoStatus({ status }: ConexaoStatusProps) {
  return (
    <View style={styles.container}>
      {status === 'connecting' ? (
        <ActivityIndicator size="small" color={Colors.azul} />
      ) : (
        <Text style={styles.text}>Aguardando conexão</Text>
      )}
    </View>
  );
}
