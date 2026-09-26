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
});
