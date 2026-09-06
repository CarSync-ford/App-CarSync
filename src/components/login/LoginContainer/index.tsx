import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, ScrollView, Keyboard, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Colors } from '@/constants/Constants';
import LoginInput from '@/src/components/login/LoginInput';
import { ILoginCredentials } from '@/src/types/login';
import { loginUser } from '@/src/services/authService';
import { validateLoginForm } from '@/src/hooks/useFormValidation';
import { styles } from './style';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

interface FieldErrors {
  email?: string;
  senha?: string;
}

export default function LoginContainer() {
  const [credentials, setCredentials] = useState<ILoginCredentials>({ email: '', senha: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
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
    // Validação Zod client-side antes de qualquer request
    const validation = validateLoginForm({ email: credentials.email, senha: credentials.senha });
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});

    setIsLoading(true);
    try {
      const data = await loginUser({
        email: credentials.email.toLowerCase(),
        password: credentials.senha,
      });
      setUserToken(data.token);
    } catch (error: any) {
      const msg = error?.message ?? 'Ocorreu um erro inesperado.';
      Toast.show({
        type: 'error',
        text1: 'Erro ao entrar',
        text2: msg,
        position: 'top',
      });
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
              onChangeText={(t) => { setCredentials({ ...credentials, email: t }); setErrors((p) => ({ ...p, email: undefined })); }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && <Text style={inlineStyles.error}>{errors.email}</Text>}

            <LoginInput 
              label="Senha" 
              placeholder="*************" 
              isPassword 
              value={credentials.senha}
              onChangeText={(t) => { setCredentials({ ...credentials, senha: t }); setErrors((p) => ({ ...p, senha: undefined })); }}
            />
            {errors.senha && <Text style={inlineStyles.error}>{errors.senha}</Text>}

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

const inlineStyles = StyleSheet.create({
  error: {
    color: '#FF4D4F',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
});

