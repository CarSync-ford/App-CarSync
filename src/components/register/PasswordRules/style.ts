import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: -4,
    marginBottom: 8,
    paddingHorizontal: 4,
    gap: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    fontSize: 13,
    color: '#8A8A8A',
    width: 14,
    textAlign: 'center',
  },
  dotMet: {
    color: '#52C41A',
    fontWeight: '700',
  },
  text: {
    fontSize: 12,
    color: '#8A8A8A',
  },
  textMet: {
    color: '#52C41A',
  },
});
