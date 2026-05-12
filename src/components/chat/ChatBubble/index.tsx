import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '@/constants/Constants';
import { TypingIndicator } from './TypingIndicator';
import { styles } from './style';

export type ChatBubbleType = 'text' | 'audio' | 'typing';

interface ChatBubbleProps {
  isUser: boolean;
  type: ChatBubbleType;
  message?: string;
  time?: string;
  duration?: string;
}

export function ChatBubble({ isUser, type, message, time, duration }: ChatBubbleProps) {
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
      {/* Time on left if user message, on right if bot message. Wait, in the image, the time is outside the bubble. */}
      {isRight && time && <Text style={styles.timeTextRight}>{time}</Text>}

      <View style={[
        styles.bubble,
        isRight ? styles.bubbleRight : styles.bubbleLeft,
        type === 'audio' && styles.audioBubbleContainer
      ]}>
        {type === 'text' && (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={[styles.messageText, isRight ? styles.messageTextRight : styles.messageTextLeft]}>
                {message}
              </Text>
            </View>
          </>
        )}

        {type === 'audio' && (
          <View>
            {/* Top part: Audio Player */}
            <View style={styles.audioPlayer}>
              <View style={styles.audioProfile}>
                <FontAwesome name="user" size={20} color="#888" solid />
              </View>
              <FontAwesome name="play" size={20} color="#FFF" style={{ marginLeft: 10 }} solid />

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={styles.progressDot} />
                </View>
                <Text style={styles.durationText}>{duration}</Text>
              </View>
            </View>

            {/* Bottom part: Transcription */}
            {message && (
              <View style={styles.transcriptionContainer}>
                <Text style={styles.transcriptionText}>{message}</Text>
              </View>
            )}
          </View>
        )}

      </View>


      {!isRight && <FontAwesome name="volume-high" size={16} color="#666" />}

      {!isRight && time && <Text style={styles.timeTextLeft}>{time}</Text>}
    </View>
  );
}
