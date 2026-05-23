import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { ChatHeader } from "../../src/components/chat/ChatHeader";
import { ChatBubble } from "../../src/components/chat/ChatBubble";
import { ChatInput } from "../../src/components/chat/ChatInput";
import { useFordVoice } from "../../src/hooks/useFordVoice";

interface ChatMessage {
  id: string;
  isUser: boolean;
  type: "text" | "audio" | "typing";
  message?: string;
  time?: string;
}

export default function ChatIA() {
  const WS_URL = process.env.EXPO_PUBLIC_WS_URL || "ws://localhost:8000/voice/stream";
  const { status, transcript, lastAction, aiResponse, error, client } = useFordVoice(
    WS_URL,
    "9BFZZZ3UZPB123401" // Ford Ranger 2024 populada no seed
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      isUser: false,
      type: "text",
      message: "Olá! Eu sou o assistente da Ford. Como posso ajudar?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Atualiza mensagens baseadas no transcript
  useEffect(() => {
    if (transcript) {
      console.log(`[Chat UI] 📝 Adicionando transcrição na tela: "${transcript}"`);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          isUser: true,
          type: "text", // Poderíamos mostrar "audio", mas texto com a transcrição é mais limpo
          message: transcript,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [transcript]);

  // Tratar metadata (ações)
  useEffect(() => {
    if (lastAction) {
      console.log('[Chat UI] 🛠️ Ação final recebida da API:', lastAction);
      // Aqui faríamos o switch(lastAction.type) para chamar open_navigation, etc.
    }
  }, [lastAction]);

  // Tratar texto da resposta da IA
  useEffect(() => {
    if (aiResponse && aiResponse.text) {
      console.log('[Chat UI] 🤖 Texto da IA recebido:', aiResponse.text);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_ai_" + aiResponse.timestamp,
          isUser: false,
          type: "text",
          message: aiResponse.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [aiResponse]);

  const handleSendAudio = (base64Data: string) => {
    if (client) {
      client.sendVoiceCommandBase64(base64Data);
    }
  };

  const handleBargeIn = () => {
    if (client) {
      client.triggerBargeIn();
    }
  };

  return (
    <View style={styles.container}>
      <ChatHeader />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              isUser={msg.isUser}
              type={msg.type}
              message={msg.message}
              time={msg.time}
            />
          ))}

          {/* Mostrar typing indicator quando a IA está pensando ou transcrevendo */}
          {(status === 'transcribing' || status === 'thinking' || status === 'speaking') && (
            <ChatBubble
              isUser={false}
              type="typing"
            />
          )}

          {error && (
            <ChatBubble
              isUser={false}
              type="text"
              message={`Erro: ${error}`}
            />
          )}
        </ScrollView>

        <ChatInput 
          status={status}
          onSendAudio={handleSendAudio}
          onBargeIn={handleBargeIn}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F5',
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 20,
    paddingBottom: 20,
  }
});
