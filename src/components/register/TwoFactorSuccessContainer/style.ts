import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/Constants';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 40,
    minHeight: height * 0.45,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 40,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  image: {
    width: 180,
    height: 180,
  },
  continueButton: {
    backgroundColor: Colors.azul,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
