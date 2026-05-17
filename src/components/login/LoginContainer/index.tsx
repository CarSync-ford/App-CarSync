import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, ScrollView, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Colors } from '@/constants/Constants';
import LoginInput from '@/src/components/login/LoginInput';
import { ILoginCredentials } from '@/src/types/login';;
import { loginUser } from '@/src/services/authService';
import { styles } from './style';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginContainer() {
  const [credentials, setCredentials] = useState<ILoginCredentials>({ email: '', senha: '' });
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUserToken } = useAuth();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const hasPlayedRef = useRef(false);

  const player = useVideoPlayer(require('@/assets/videos/video_fordinho.mp4'), (p) => {
    p.loop = false;
    p.muted = true;
    p.play();
  });

  useEffect(() => {
    const sub = player.addListener('playingChange', ({ isPlaying }) => {
      if (isPlaying) {
        hasPlayedRef.current = true; // vídeo começou
      } else if (hasPlayedRef.current) {
        hasPlayedRef.current = false; // reseta para o próximo ciclo
        setTimeout(() => player.replay(), 5000); // 5s de pausa antes de reiniciar
      }
    });
    return () => sub.remove();
  }, [player]);

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
    if (!credentials.email || !credentials.senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginUser({
        email: credentials.email,
        password: credentials.senha,
      });
      // router.push('/mfa'); // autenticação de dois fatores desativada temporariamente
      setUserToken(data.token); // atualiza o contexto → o guard do _layout redireciona para /(tabs)
    } catch (error: any) {
      Alert.alert('Erro ao entrar', error?.message ?? 'Ocorreu um erro inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[Colors.degrade_login.topo, Colors.degrade_login.base]}
      style={[styles.background, { paddingTop: insets.top }]}
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
            <VideoView
              player={player}
              style={styles.logo}
              contentFit="contain"
              nativeControls={false}
            />
            
            <View style={styles.headerText}>
              <Text style={styles.title}>Entrar</Text>
              <Text style={styles.subtitle}>Bem-vindo de volta! Por favor, faça login para continuar.</Text>
            </View>

            <LoginInput 
              label="E-mail" 
              placeholder="Digite seu e-mail" 
              value={credentials.email}
              onChangeText={(t) => setCredentials({ ...credentials, email: t })}
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

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
              {isLoading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.loginButtonText}>Entrar</Text>
              }
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
