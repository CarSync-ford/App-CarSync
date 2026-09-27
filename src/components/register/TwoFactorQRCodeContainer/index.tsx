import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { Colors } from '@/constants/Constants';
import { styles } from './style';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { generateBase32Secret, buildOtpAuthUri } from '@/src/utils/totp';
import { getSecureItem, setSecureItem } from '@/src/utils/secureStorage';

const MFA_SECRET_KEY = 'mfa_totp_secret';

export default function TwoFactorQRCodeContainer() {
  const router = useRouter();
  const [secret, setSecret] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const existing = await getSecureItem(MFA_SECRET_KEY);
      if (existing) {
        setSecret(existing);
        return;
      }
      const generated = generateBase32Secret();
      await setSecureItem(MFA_SECRET_KEY, generated);
      setSecret(generated);
    })();
  }, []);

  const handleCopy = () => {
    Alert.alert('Chave secreta', secret ?? 'Gerando chave...');
  };

  const otpauthUri = secret ? buildOtpAuthUri(secret, 'CarSync App', 'CarSync') : '';
  const groups = secret ? secret.match(/.{1,4}/g) ?? [secret] : [];

  return (
    <LinearGradient
      colors={[Colors.degrade_login.topo, Colors.degrade_login.base]}
      style={styles.background}
    >
      <View style={styles.sheetContainer}>
        <Text style={styles.title}>Autenticação de{'\n'}dois fatores</Text>

        <Text style={styles.instructionText}>
          Após isso, clique em adicionar e aparecerá duas opções:
        </Text>

        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>
            Escaneie esse <Text style={styles.linkText}>QRCODE</Text>
          </Text>
        </View>

        <View style={styles.qrCodeBox}>
          {secret ? (
            <QRCode value={otpauthUri} size={180} />
          ) : (
            <Text style={styles.stepText}>Gerando...</Text>
          )}
        </View>

        <Text style={styles.orText}>ou</Text>

        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>
            Cole essa <Text style={styles.linkText}>chave</Text>
          </Text>
        </View>

        <View style={styles.keyContainer}>
          <Text style={styles.keyText}>{groups.slice(0, 4).join(' ')}</Text>
          <Text style={styles.keyText}>{groups.slice(4).join(' ')}</Text>
        </View>

        <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
          <Ionicons name="copy-outline" size={18} color={Colors.azul} />
          <Text style={styles.copyButtonText}>Copiar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push('/mfa')}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
