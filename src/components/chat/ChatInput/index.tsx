import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SendMessageIcon from '../../icons/SendMessage';
import { styles } from './style';

export interface ChatInputProps {
  status: string;
  onSendText: (text: string) => void;
}

export function ChatInput({ status, onSendText }: ChatInputProps) {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');

  const handleSend = () => {
    const texto = text.trim();
    if (!texto) return;
    onSendText(texto);
    setText('');
  };

  const podeEnviar = text.trim().length > 0;

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Digite algo..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
          editable={status !== 'thinking'}
          onSubmitEditing={handleSend}
        />
      </View>

      <Pressable onPress={handleSend} disabled={!podeEnviar}>
        <View style={[styles.sendButton, !podeEnviar && styles.sendButtonDisabled]}>
          <SendMessageIcon width={20} height={20} color="#FFF" />
        </View>
      </Pressable>
    </View>
  );
}
