import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthContext } from '../../contexts/AuthContext';
import { RootStackParamList } from '../../../App';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, isAuthenticated } = useAuthContext();

  console.log('LoginScreen - Rendering with isAuthenticated:', isAuthenticated);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Per favore inserisci email e password');
      return;
    }

    try {
      setLoading(true);
      setError('');
      console.log('LoginScreen - Attempting login with:', email);
      
      await login(email, password);
      console.log('LoginScreen - Login successful');
      
    } catch (err: any) {
      console.error('LoginScreen - Login error:', err);
      setError('Login fallito. Controlla le tue credenziali.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    console.log('LoginScreen - Navigating to Register');
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Login</Title>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Login
      </Button>

      <Button
        mode="text"
        onPress={handleRegister}
        style={styles.link}
      >
        Non hai un account? Registrati
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  link: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
