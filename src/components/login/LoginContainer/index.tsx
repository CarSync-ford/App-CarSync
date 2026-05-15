import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, ScrollView, Alert, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av';
import { Colors } from '@/constants/Constants';
import LoginInput from '@/src/components/login/LoginInput';
import { ILoginCredentials } from '@/src/interfaces/login';
import { styles } from './style';
import { useRouter } from 'expo-router';

export default function LoginContainer() {
  const [credentials, setCredentials] = useState<ILoginCredentials>({ usuario: '', senha: '' });
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const scrollRef = useRef<ScrollView>(null);

  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.didJustFinish) {
      setTimeout(async () => {
        try {
          await videoRef.current?.playFromPositionAsync(0);
        } catch (error) {
          // Ignores if component unmounted
        }
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

  const handleLogin = async () => {
    if (!credentials.usuario || !credentials.senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      // Validaria na API aqui, e em caso de sucesso manda para o 2FA
      router.push('/mfa');
    } catch (e) {
      Alert.alert('Erro', 'Ocorreu um erro ao realizar o login.');
    }
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
              <Text style={styles.title}>Entrar</Text>
              <Text style={styles.subtitle}>Bem-vindo de volta! Por favor, faça login para continuar.</Text>
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Não possui uma conta? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.registerText}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
    </LinearGradient>
  );
}
