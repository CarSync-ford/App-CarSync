import React, { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { ChatHeader } from "../../src/components/chat/ChatHeader";
import { ChatBubble } from "../../src/components/chat/ChatBubble";
import { ChatInput } from "../../src/components/chat/ChatInput";
import { respostasFordinho, respostasPorPalavraChave } from "../../src/data/chatRespostasMock";

interface ChatMessage {
  id: string;
  isUser: boolean;
  type: "text" | "typing";
  message?: string;
  time?: string;
}

function horaAtual() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function respostaPara(mensagem: string) {
  const texto = mensagem.toLowerCase();
  const encontrada = respostasPorPalavraChave.find((item) =>
    item.palavras.some((palavra) => texto.includes(palavra))
  );
  if (encontrada) return encontrada.resposta;

  return respostasFordinho[Math.floor(Math.random() * respostasFordinho.length)];
}

export default function ChatIA() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      isUser: false,
      type: "text",
      message: "Olá! Eu sou o assistente da Ford. Como posso ajudar?",
      time: horaAtual(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const responder = (mensagemUsuario: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_ai",
          isUser: false,
          type: "text",
          message: respostaPara(mensagemUsuario),
          time: horaAtual(),
        },
      ]);
    }, 1200);
  };

  const handleSendText = (texto: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), isUser: true, type: "text", message: texto, time: horaAtual() },
    ]);
    responder(texto);
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

          {isTyping && <ChatBubble isUser={false} type="typing" />}
        </ScrollView>

        <ChatInput
          status={isTyping ? 'thinking' : 'idle'}
          onSendText={handleSendText}
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
