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
  headerText: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 40,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  linkText: {
    color: Colors.azul,
    fontWeight: '600',
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  badge: {
    width: '48%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  badgeContent: {
    marginLeft: 5,
  },
  badgeSubText: {
    fontSize: 8,
    color: '#000',
  },
  badgeMainText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
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
