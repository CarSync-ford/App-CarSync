import React from 'react';
import { Text, View } from 'react-native';
import { TypingIndicator } from "../TypingIndicator";
import { styles } from './style';
import { ChatBubbleProps } from '@/src/interfaces/chat';;

export function ChatBubble({ isUser, type, message, time }: ChatBubbleProps) {
  const isRight = isUser;

  if (type === 'typing') {
    return (
      <View style={[styles.wrapper, styles.wrapperLeft]}>
        <View style={[styles.bubble, styles.bubbleLeft, styles.typingBubble]}>
          <TypingIndicator />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, isRight ? styles.wrapperRight : styles.wrapperLeft]}>
      {isRight && time && <Text style={styles.timeTextRight}>{time}</Text>}

      <View style={[styles.bubble, isRight ? styles.bubbleRight : styles.bubbleLeft]}>
        <Text style={[styles.messageText, isRight ? styles.messageTextRight : styles.messageTextLeft]}>
          {message}
        </Text>
      </View>

      {!isRight && time && <Text style={styles.timeTextLeft}>{time}</Text>}
    </View>
  );
}
