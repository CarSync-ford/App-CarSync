import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Constants';
import SendMessageIcon from '../../icons/SendMessage';
import { styles } from './style';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';

export interface ChatInputProps {
  status: string;
  onSendAudio: (base64Data: string) => void;
  onBargeIn: () => void;
}

export function ChatInput({ status, onSendAudio, onBargeIn }: ChatInputProps) {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bgAnim = useRef(new Animated.Value(0)).current;

  const [recording, setRecording] = useState<Audio.Recording | null>(null);

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

  const handlePressMic = async () => {
    if (status === 'speaking' || status === 'thinking') {
      // Se o assistente estiver falando ou pensando, tratamos como barge-in
      onBargeIn();
      return;
    }

    if (isRecording) {
      // Para gravação
      setIsRecording(false);
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);

        if (uri) {
          try {
            const base64Str = await FileSystem.readAsStringAsync(uri, {
              encoding: 'base64',
            });
            console.log(`[ChatInput] Gravação finalizada. Áudio lido em Base64 (${base64Str.length} caracteres)`);
            onSendAudio(base64Str);
          } catch (err) {
            console.error('Erro ao ler audio:', err);
          }
        }
      }
    } else {
      // Inicia gravação
      try {
        const permission = await Audio.requestPermissionsAsync();
        if (permission.status === 'granted') {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
          const { recording: newRec } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          console.log('[ChatInput] Gravação iniciada...');
          setRecording(newRec);
          setIsRecording(true);
        }
      } catch (err) {
        console.error('Falha ao iniciar gravação', err);
      }
    }
  };

  const getMicIcon = () => {
    if (status === 'speaking' || status === 'thinking') {
      return <FontAwesome name="stop" size={20} color="#FFF" />;
    }
    return <FontAwesome name="microphone" size={20} color="#FFF" />;
  };

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
            editable={status !== 'speaking' && status !== 'thinking'}
          />
        </View>
      )}

      <Pressable onPress={handlePressMic}>
        <Animated.View style={[styles.micButton, { backgroundColor: bgColor }]}>
          {text.length > 0 ? (
            <SendMessageIcon width={20} height={20} color="#FFF" />
          ) : (
            getMicIcon()
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}
