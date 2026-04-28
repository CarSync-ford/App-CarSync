import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/Constants';
import SendMessageIcon from '../icons/SendMessage';

export function ChatInput() {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: isRecording ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();

    if (isRecording) {
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.azul, Colors.vermelho],
  });

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 24)}]}>
      {isRecording ? (
        <Text style={styles.recordingText}>{formatTime(seconds)}</Text>
      ) : (
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Digite algo..."
            placeholderTextColor="#999"
            value={text}
            onChangeText={setText}
          />
        </View>
      )}

      <Pressable onPress={() => setIsRecording(v => !v)}>
        <Animated.View style={[styles.micButton, { backgroundColor: bgColor }]}>
          {text.length > 0 ? (
            <SendMessageIcon width={20} height={20} color="#FFF" />
          ) : (
            <FontAwesome name="microphone" size={20} color="#FFF" />
          )}
        </Animated.View>
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
  recordingText: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.light.preto,
    marginRight: 12,
    alignSelf: 'center',
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
  micButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
});
