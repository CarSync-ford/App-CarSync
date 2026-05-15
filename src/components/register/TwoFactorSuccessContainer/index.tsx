import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Constants';
import { styles } from './style';
import { useAuth } from '@/src/contexts/AuthContext';

export default function TwoFactorSuccessContainer() {
  const { signIn } = useAuth();

  const handleContinue = async () => {
    // Autentica o recém-cadastrado para enviá-lo ao dashboard
    await signIn('novo_usuario', '***');
  };

  return (
    <LinearGradient
      colors={[Colors.degrade_login.topo, Colors.degrade_login.base]}
      style={styles.background}
    >
      <View style={styles.sheetContainer}>
        <Text style={styles.title}>Autenticação de{'\n'}dois fatores</Text>
        <Text style={styles.subtitle}>Realizado com sucesso!</Text>

        <View style={styles.imageContainer}>
          <Image 
            source={require('@/assets/images/fordinho_ok.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
