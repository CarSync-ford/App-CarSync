import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/Constants';

export function ChatInput() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Digite algo..."
          placeholderTextColor="#999"
        />
      </View>
      
      <Pressable style={styles.micButton}>
        <FontAwesome name="microphone" size={25} color="#FFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
    paddingVertical: 17,
    marginRight: 12,
    borderColor:  '#DADADA',
    borderWidth: 2,
  },
  input: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#333',
    maxHeight: 100, // Limita altura se for multiline futuramente
  },
  micButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#347ED5",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  }
});
