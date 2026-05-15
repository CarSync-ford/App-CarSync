import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Constants';
import { styles } from './style';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function TwoFactorSetupContainer() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[Colors.degrade_login.topo, Colors.degrade_login.base]}
      style={styles.background}
    >
      <View style={styles.sheetContainer}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Autenticação de dois fatores</Text>
          <Text style={styles.subtitle}>
            Para isso, é necessário que instale <Text style={styles.linkText}>Google Authenticator</Text>
          </Text>
        </View>

        <View style={styles.badgesContainer}>
          <TouchableOpacity style={styles.badge}>
            <Ionicons name="logo-apple" size={24} color="black" />
            <View style={styles.badgeContent}>
              <Text style={styles.badgeSubText}>Download on the</Text>
              <Text style={styles.badgeMainText}>App Store</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.badge}>
            <FontAwesome5 name="google-play" size={20} color="black" />
            <View style={styles.badgeContent}>
              <Text style={styles.badgeSubText}>GET IT ON</Text>
              <Text style={styles.badgeMainText}>Google Play</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
