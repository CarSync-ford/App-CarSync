import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { ChatHeader } from "../../src/components/chat/ChatHeader";
import { ChatBubble } from "../../src/components/chat/ChatBubble";
import { ChatInput } from "../../src/components/chat/ChatInput";

export default function ChatIA() {
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
          <ChatBubble
            isUser={false}
            type="text"
            message="Como posso ajudar?"
            time="12:34"
          />

          <ChatBubble
            isUser={true}
            type="audio"
            message="Gostaria de saber Lorem ipsum dolor sitamet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consect. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            duration="0:12"
            time="12:34"
          />

          <ChatBubble
            isUser={false}
            type="typing"
          />
        </ScrollView>

        <ChatInput />
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
