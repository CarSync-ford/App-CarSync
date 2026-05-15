import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, ScrollView, Alert, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av';
import { Colors } from '@/constants/Constants';
import LoginInput from '@/src/components/login/LoginInput';
import { IRegisterCredentials } from '@/src/interfaces/register';
import { styles } from './style';
import { useRouter } from 'expo-router';

export default function RegisterContainer() {
  const [credentials, setCredentials] = useState<IRegisterCredentials>({ usuario: '', senha: '', confirmarSenha: '' });
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const scrollRef = useRef<ScrollView>(null);

  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.didJustFinish) {
      setTimeout(async () => {
        try {
          await videoRef.current?.playFromPositionAsync(0);
        } catch (error) {}
      }, 5000);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setTimeout(() => {
          scrollRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleRegister = () => {
    if (!credentials.usuario || !credentials.senha || !credentials.confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (credentials.senha !== credentials.confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
      { text: 'OK', onPress: () => router.replace('/login') }
    ]);
  };

  return (
    <LinearGradient
      colors={[Colors.degrade_login.topo, Colors.degrade_login.base]}
      style={styles.background}
    >
      <ScrollView 
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.sheetContainer, { paddingBottom: 40 + keyboardHeight }]}>
            <Video 
              ref={videoRef}
              source={require('@/assets/videos/video_fordinho.mp4')} 
              style={styles.logo} 
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              isMuted
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
            
            <View style={styles.headerText}>
              <Text style={styles.title}>Cadastro</Text>
              <Text style={styles.subtitle}>Bem-vindo! Por favor, registre-se para continuar.</Text>
            </View>

            <LoginInput 
              label="Usuário" 
              placeholder="Digite seu usuário" 
              value={credentials.usuario}
              onChangeText={(t) => setCredentials({ ...credentials, usuario: t })}
              autoCapitalize="none"
            />
            <LoginInput 
              label="Senha" 
              placeholder="*************" 
              isPassword 
              value={credentials.senha}
              onChangeText={(t) => setCredentials({ ...credentials, senha: t })}
            />
            <LoginInput 
              label="Confirmar senha" 
              placeholder="*************" 
              isPassword 
              value={credentials.confirmarSenha}
              onChangeText={(t) => setCredentials({ ...credentials, confirmarSenha: t })}
            />

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Continuar</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Já possui uma conta? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.loginText}>Faça login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
    </LinearGradient>
  );
}
