import { Colors } from '@/constants/Constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';

export function FordinhoBanner() {
  return (
    <LinearGradient
      colors={['#E8B931', '#F0CF65']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.bubbleContainer}>
        <Text style={styles.greeting}>
          Olá, eu sou o Fordinho e estou{'\n'}aqui para te ajudar!
        </Text>
        <Text style={styles.suggestion}>
          Sugiro agendar{' '}
          <Text style={styles.link}>Manutenção{'\n'}Preventiva</Text>.
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
    paddingVertical: 18,
    paddingLeft: 18,
    paddingRight: 8,
    minHeight: 125,
    overflow: 'visible', // allows mascot to overflow a bit if needed
  },
  bubbleContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    position: 'relative',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  triangle: {
    position: 'absolute',
    right: -10,
    top: '50%',
    marginTop: -8,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: '#FFFFFF',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  greeting: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
    lineHeight: 18,
    marginBottom: 4,
  },
  suggestion: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
    lineHeight: 18,
  },
  link: {
    color: Colors.azul,
    fontFamily: 'Inter_600SemiBold',
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 5,
  },
  mascotImage: {
    width: 110,
    height: 110,
  },
});
