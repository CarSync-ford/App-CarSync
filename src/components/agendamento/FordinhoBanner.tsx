import { Colors } from '@/constants/Constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',    
    justifyContent: "space-between",
    width: '100%',
    borderRadius: 20,
    paddingVertical: 13,
    paddingLeft: 16,
    paddingRight: 8,
    minHeight: 125,
    overflow: 'visible', // allows mascot to overflow a bit if needed
  },
  bubbleContainer: {
    flex: 1,
    maxWidth: "70%",
    height: "100%",
    display: 'flex', 
    alignItems: "center",
    justifyContent: "center",
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
    right: -17,
    top: '70%',
    marginTop: -8,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: '#FFFFFF',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  greeting: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: "#000000",
    lineHeight: 15,
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
    width: "50%",
    minHeight: "70%",
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: -20
  },
  mascotImage: {
    width: "100%",
    height: "100%"
  },
});
