import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    gap: 12,
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
    padding: 12,
    borderRadius: 10,
    position: 'relative',
  },
  bubbleLeft: {
    backgroundColor: '#F2F2F2',
    borderBottomLeftRadius: 4,
  },
  bubbleRight: {
    backgroundColor: Colors.azul,
    borderBottomRightRadius: 4,
  },
  typingBubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  audioBubbleContainer: {
    padding: 0,
    overflow: 'hidden',
    backgroundColor: Colors.azul,
    width: 260,
  },
  messageText: {
    marginHorizontal: 4,
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
    width: '100%',
    fontSize: 10,
    color: '#888',
    marginLeft: 8,
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginBottom: 4,
  },
  timeTextRight: {
    width: '100%',
    fontSize: 10,
    color: '#888',
    marginRight: 8,
    alignSelf: 'flex-end',
    textAlign: 'left',
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
    height: '100%',
    marginLeft: 10,
    marginTop: 17
  },
  progressBar: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 5
  },
  transcriptionContainer: {
    backgroundColor: '#B5D0FC',
    paddingHorizontal: 11,
    paddingVertical: 8
  },
  transcriptionText: {
    fontSize: 12,
    color: '#616161',
    lineHeight: 16,
  },
});
