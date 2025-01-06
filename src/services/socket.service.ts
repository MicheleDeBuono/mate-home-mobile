import { io, Socket } from 'socket.io-client';
import { API_URL } from '../config';

class SocketService {
  private socket: Socket | null = null;
  private listeners: { [event: string]: Function[] } = {};

  // Inizializza la connessione Socket.IO
  connect(token: string) {
    if (this.socket?.connected) return;

    this.socket = io(API_URL, {
      auth: { token },
    });

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    this.socket.on('error', (error) => {
      console.error('Socket.IO error:', error);
    });

    // Ascolta gli eventi specifici
    this.socket.on('newAlert', (alert) => {
      this.notifyListeners('newAlert', alert);
    });

    this.socket.on('deviceUpdate', (update) => {
      this.notifyListeners('deviceUpdate', update);
    });

    this.socket.on('statsUpdate', (stats) => {
      this.notifyListeners('statsUpdate', stats);
    });
  }

  // Disconnette dal server Socket.IO
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Aggiunge un listener per un evento specifico
  addListener(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  // Rimuove un listener per un evento specifico
  removeListener(event: string, callback: Function) {
    if (!this.listeners[event]) return;
    
    this.listeners[event] = this.listeners[event].filter(
      (cb) => cb !== callback
    );
  }

  // Notifica tutti i listener di un evento specifico
  private notifyListeners(event: string, data: any) {
    if (!this.listeners[event]) return;
    
    this.listeners[event].forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${event} listener:`, error);
      }
    });
  }

  // Verifica se il socket è connesso
  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
