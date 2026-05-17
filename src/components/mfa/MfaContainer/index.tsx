import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Constants';
import OtpInput from '@/src/components/mfa/OtpInput';
import { useAuth } from '@/src/contexts/AuthContext';
import { styles } from './style';

export default function MfaContainer() {
  const [code, setCode] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { signIn } = useAuth();

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardHeight(0)
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleContinue = async () => {
    if (code.length < 6) {
      Alert.alert('Atenção', 'Digite o código completo de 6 dígitos.');
      return;
    }
    
    try {
      // Como a validação passou, chamamos o signIn do contexto 
      // que injeta o token e manda pra Home real
      await signIn('usuario_logado', '***');
    } catch (e) {
      Alert.alert('Erro', 'Código inválido.');
    }
  };

  return (
    <LinearGradient
      colors={[Colors.degrade_login.topo, Colors.degrade_login.base]}
      style={styles.background}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.sheetContainer, { paddingBottom: 40 + keyboardHeight }]}>
          <Text style={styles.title}>Autenticação de dois fatores</Text>
          <Text style={styles.subtitle}>
            Digite o código que aparece no seu APP Google Authenticator
          </Text>

          <OtpInput value={code} onChangeText={setCode} length={6} />

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
