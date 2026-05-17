import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, ScrollView, Alert, Keyboard, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Colors } from '@/constants/Constants';
import LoginInput from '@/src/components/login/LoginInput';
import { IRegisterCredentials } from '@/src/types/register';;
import { registerUser } from '@/src/services/authService';
import { isValidEmail, isValidCPF, isValidPassword, maskCPF } from '@/src/utils/validation';
import PasswordRules from '@/src/components/register/PasswordRules';
import { styles } from './style';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FieldErrors {
  nome?: string;
  email?: string;
  cpf?: string;
  senha?: string;
  confirmarSenha?: string;
}

export default function RegisterContainer() {
  const [credentials, setCredentials] = useState<IRegisterCredentials>({ nome: '', email: '', cpf: '', senha: '', confirmarSenha: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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

  const setField = (field: keyof IRegisterCredentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleCPFChange = (value: string) => {
    setField('cpf', maskCPF(value));
  };

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};

    if (!credentials.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório.';
    }

    if (!credentials.email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!isValidEmail(credentials.email)) {
      newErrors.email = 'Informe um e-mail válido.';
    }

    if (!credentials.cpf) {
      newErrors.cpf = 'CPF é obrigatório.';
    } else if (!isValidCPF(credentials.cpf)) {
      newErrors.cpf = 'CPF inválido.';
    }

    const passwordCheck = isValidPassword(credentials.senha);
    if (!credentials.senha) {
      newErrors.senha = 'Senha é obrigatória.';
    } else if (!passwordCheck.valid) {
      newErrors.senha = passwordCheck.message;
    }

    if (!credentials.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirme a senha.';
    } else if (credentials.senha !== credentials.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      await registerUser({
        username: credentials.nome,
        email: credentials.email,
        password: credentials.senha,
        cpf: credentials.cpf.replace(/\D/g, ''),
      });
      // router.push('/two-factor-setup'); // autenticação de dois fatores desativada temporariamente
      console.log('[RegisterContainer] Cadastro bem-sucedido, redirecionando para login...');
      router.replace('/login');
    } catch (error: any) {
      console.log('[RegisterContainer] Erro no cadastro:', error?.message);
      Alert.alert('Erro no cadastro', error?.message ?? 'Ocorreu um erro inesperado.');
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
            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.subtitle}>Bem-vindo! Por favor, registre-se para continuar.</Text>
          </View>

          <LoginInput
            label="Nome"
            placeholder="Digite seu nome"
            value={credentials.nome}
            onChangeText={(t) => setField('nome', t)}
            autoCapitalize="none"
          />
          {errors.nome && <Text style={inlineStyles.error}>{errors.nome}</Text>}

          <LoginInput
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={credentials.email}
            onChangeText={(t) => setField('email', t)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.email && <Text style={inlineStyles.error}>{errors.email}</Text>}

          <LoginInput
            label="CPF"
            placeholder="000.000.000-00"
            value={credentials.cpf}
            onChangeText={handleCPFChange}
            autoCapitalize="none"
            keyboardType="numeric"
            maxLength={14}
          />
          {errors.cpf && <Text style={inlineStyles.error}>{errors.cpf}</Text>}

          <LoginInput
            label="Senha"
            placeholder="*************"
            isPassword
            value={credentials.senha}
            onChangeText={(t) => setField('senha', t)}
          />
          <PasswordRules password={credentials.senha} />
          {errors.senha && <Text style={inlineStyles.error}>{errors.senha}</Text>}

          <LoginInput
            label="Confirmar senha"
            placeholder="*************"
            isPassword
            value={credentials.confirmarSenha}
            onChangeText={(t) => setField('confirmarSenha', t)}
          />
          {errors.confirmarSenha && <Text style={inlineStyles.error}>{errors.confirmarSenha}</Text>}

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
            {isLoading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.registerButtonText}>Continuar</Text>
            }
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
const inlineStyles = StyleSheet.create({
  error: {
    color: '#FF4D4F',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
});
