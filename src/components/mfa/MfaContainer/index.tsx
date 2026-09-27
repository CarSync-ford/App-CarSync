import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Constants';
import OtpInput from '@/src/components/mfa/OtpInput';
import { useAuth } from '@/src/contexts/AuthContext';
import { verifyTotpCode } from '@/src/utils/totp';
import { getSecureItem } from '@/src/utils/secureStorage';
import { styles } from './style';

const MFA_SECRET_KEY = 'mfa_totp_secret';

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

    const secret = await getSecureItem(MFA_SECRET_KEY);
    if (!secret) {
      Alert.alert('Erro', 'Nenhum autenticador configurado. Refaça o setup de 2FA.');
      return;
    }

    if (!verifyTotpCode(secret, code)) {
      Alert.alert('Código inválido', 'O código digitado não confere com o autenticador.');
      return;
    }

    await signIn('usuario_logado', '***');
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
