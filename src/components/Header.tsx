import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Constants';

export function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <View style={styles.profileCircle}>
          <FontAwesome name="user" size={24} color={Colors.cinza} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Milena Marez</Text>
          <Text style={styles.subtitleText}>Ranger Raptor {'>'}</Text>
        </View>
      </View>

      <View style={styles.bellContainer}>
        <FontAwesome name="bell" size={26} color={Colors.light.preto} solid />
        <View style={styles.badge} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 15, 
    paddingBottom: 10,
    backgroundColor: "rgba(227, 226, 232, 0.85)",
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold', 
    color: Colors.azul,
  },
  subtitleText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold', 
    color: Colors.light.preto,
    textDecorationLine: 'underline',
  },
  bellContainer: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.azul,
  }
});
