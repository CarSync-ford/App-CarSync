import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av';
import { Colors } from '@/constants/Constants';
import LoginInput from '@/src/components/login/LoginInput';
import { useAuth } from '@/src/contexts/AuthContext';
import { ILoginCredentials } from '@/src/interfaces/login';
import { styles } from './style';

export default function LoginContainer() {
  const [credentials, setCredentials] = useState<ILoginCredentials>({ usuario: '', senha: '' });
  const { signIn } = useAuth();
  const videoRef = useRef<Video>(null);

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

  const handleLogin = async () => {
    if (!credentials.usuario || !credentials.senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await signIn(credentials.usuario, credentials.senha);
      // Obs: O redirecionamento agora e gerenciado pelo RootLayoutNav
    } catch (e) {
      Alert.alert('Erro', 'Ocorreu um erro ao realizar o login.');
    }
  };

  return (
    <LinearGradient
      colors={[Colors.degrade_login.topo, Colors.degrade_login.base]}
      style={styles.background}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
        >
          <View style={styles.sheetContainer}>
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
              <TouchableOpacity>
                <Text style={styles.registerText}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
