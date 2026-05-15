import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Constants';
import { styles } from './style';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TwoFactorQRCodeContainer() {
  const router = useRouter();

  const handleCopy = () => {
    Alert.alert('Copiado', 'A chave foi copiada para a área de transferência.');
  };

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

        {/* Espaço reservado para a futura lib de QRCode */}
        <View style={styles.qrCodePlaceholder} />

        <Text style={styles.orText}>ou</Text>

        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>
            Cole essa <Text style={styles.linkText}>chave</Text>
          </Text>
        </View>

        <View style={styles.keyContainer}>
          <Text style={styles.keyText}>ABCD EFGH IJKL MNOP</Text>
          <Text style={styles.keyText}>QRST UVWX YZAB CDEF</Text>
        </View>

        <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
          <Ionicons name="copy-outline" size={18} color={Colors.azul} />
          <Text style={styles.copyButtonText}>Copiar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={() => router.push('/login')}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
