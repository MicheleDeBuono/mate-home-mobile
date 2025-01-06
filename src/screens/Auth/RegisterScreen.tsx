import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { authService } from '../../services/auth.service';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Validazione
      if (!name || !email || !password) {
        throw new Error('Tutti i campi sono obbligatori');
      }
      
      await authService.signUp({ name, email, password });
      // La registrazione include già il login, quindi verremo reindirizzati automaticamente
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.message === 'Network Error') {
        setError('Errore di connessione al server. Verifica la tua connessione internet.');
      } else {
        setError(err.message || 'Errore durante la registrazione');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Registrati a MateHome</Title>
      
      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}

      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Registrati
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Login' as never)}
        style={styles.link}
      >
        Hai già un account? Accedi
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
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  link: {
    marginTop: 20,
  },
  error: {
    color: '#ff4444',
    marginBottom: 15,
    textAlign: 'center',
  }
});
