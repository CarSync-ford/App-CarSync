import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/Constants';

export function ChatHeader() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top || 15 }]}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <FontAwesome name="chevron-left" size={20} color={Colors.light.preto} />
      </Pressable>

      <View style={styles.centerGroup}>
        <Image 
          source={require('../../../assets/images/fordinho_chat.png')} 
          style={styles.avatar} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Fordinho</Text>
          <Text style={styles.subtitle}>Chat IA</Text>
        </View>
      </View>

      <View style={styles.bellContainer}>
        <FontAwesome name="bell" size={24} color={Colors.light.preto} solid />
        <View style={styles.badge} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 15,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  backButton: {
    padding: 10,
    marginLeft: -10, // Para compensar o padding e alinhar com a margem
  },
  centerGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF', // Fundo branco caso a imagem tenha transparência
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold', 
    color: Colors.azul,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular', 
    color: Colors.light.preto,
  },
  bellContainer: {
    position: 'relative',
    padding: 5,
    marginRight: -5,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.azul,
    borderWidth: 1.5,
    borderColor: '#DCE7F5', // Cor do fundo da tela (para criar o gap em volta da bolinha)
  }
});
