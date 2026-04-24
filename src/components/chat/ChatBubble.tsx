import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../../constants/Constants';

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
          <FontAwesome name="ellipsis" size={24} color="#C0C0C2" />
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
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={[styles.messageText, isRight ? styles.messageTextRight : styles.messageTextLeft]}>
                {message}
              </Text>
              {!isRight && <FontAwesome name="volume-high" size={16} color="#666" />}
            </View>
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

          {/* Bubble Tail */}
          <View style={[
            styles.tail,
            isRight ? styles.tailRight : styles.tailLeft,
            (isRight && type === 'audio') && styles.tailRightAudio
          ]} />
      </View>

      {!isRight && time && <Text style={styles.timeTextLeft}>{time}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  wrapperLeft: {
    justifyContent: 'flex-start',
  },
  wrapperRight: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 18,
    position: 'relative',
  },
  bubbleLeft: {
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 4,
  },
  bubbleRight: {
    backgroundColor: Colors.azul,
    borderBottomRightRadius: 4,
  },
  typingBubble: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  audioBubbleContainer: {
    padding: 0,
    overflow: 'hidden',
    backgroundColor: Colors.azul,
    width: 260,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  messageTextLeft: {
    color: '#333',
  },
  messageTextRight: {
    color: '#FFF',
  },
  timeTextLeft: {
    fontSize: 10,
    color: '#888',
    marginLeft: 8,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  timeTextRight: {
    fontSize: 10,
    color: '#888',
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.azul,
  },
  audioProfile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    marginLeft: 12,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
    position: 'absolute',
    left: '20%', // fixed visual
  },
  durationText: {
    color: '#FFF',
    fontSize: 10,
  },
  transcriptionContainer: {
    backgroundColor: '#B5D0FC',
    padding: 12,
  },
  transcriptionText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
  },
  tail: {
    position: 'absolute',
    bottom: 0,
    width: 15,
    height: 15,
    zIndex: -1,
  },
  tailLeft: {
    left: -8,
    borderBottomRightRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  tailRight: {
    right: -8,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.azul,
  },
  tailRightAudio: {
    backgroundColor: '#B5D0FC',
  }
});
