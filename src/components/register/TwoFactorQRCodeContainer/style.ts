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
    minHeight: height * 0.70,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 40,
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    color: Colors.azul,
    fontWeight: '600',
  },
  qrCodePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#F5F5F5',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  orText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
    marginVertical: 10,
    fontWeight: '500',
  },
  keyContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  keyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 24,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.azul,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 15,
    alignSelf: 'center',
  },
  copyButtonText: {
    color: Colors.azul,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: Colors.azul,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
