import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// In un ambiente reale, questo dovrebbe essere gestito tramite variabili d'ambiente
const BASE_URL = 'http://192.168.86.37:3000/api'; // IP locale del tuo computer

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // Timeout dopo 10 secondi
});

// Interceptor per aggiungere il token alle richieste
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Interceptor per gestire gli errori
api.interceptors.response.use(
  (response) => {
    if (response.headers['content-type']?.includes('text/html')) {
      throw new Error('Risposta non valida dal server');
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Gestione errori specifici
    if (error.response) {
      // Il server ha risposto con un codice di errore
      if (error.response.headers['content-type']?.includes('text/html')) {
        return Promise.reject(new Error('Risposta non valida dal server'));
      }
      const message = error.response.data?.message || 'Errore durante la richiesta';
      return Promise.reject(new Error(message));
    }
    
    if (error.message === 'Network Error') {
      return Promise.reject(new Error('Errore di connessione al server. Verifica la tua connessione internet.'));
    }
    
    return Promise.reject(error);
  }
);

export default api;
