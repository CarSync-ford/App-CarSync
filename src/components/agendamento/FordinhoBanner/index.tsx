import { Colors } from '@/constants/Constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, View } from 'react-native';
import { styles } from './style';

export function FordinhoBanner() {
  return (
    <LinearGradient
      colors={[Colors.gradiente_amarelo.escuro, Colors.gradiente_amarelo.claro]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.bubbleContainer}>
        <Text style={styles.greeting}>
          Olá, eu sou o Fordinho e estou aqui para te ajudar! {"\n"}
          Sugiro agendar{' '}
          <Text style={styles.link}>Manutenção Preventiva</Text>.
        </Text>
        <View style={styles.triangle} />
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/fordinho.png')}
          style={styles.mascotImage}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}
