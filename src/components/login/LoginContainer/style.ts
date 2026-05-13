import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/Constants';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    minHeight: '75%',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    marginTop: -100,
    marginBottom: 20,
  },
  headerText: {
    width: '100%',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.preto,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: Colors.azul,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: Colors.azul,
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  registerText: {
    color: Colors.azul,
    fontSize: 14,
    fontWeight: 'bold',
  }
});
