import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Alert {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error';
  read: boolean;
}

class AlertsService {
  private static instance: AlertsService;
  private STORAGE_KEY = '@alerts';

  private constructor() {}

  public static getInstance(): AlertsService {
    if (!AlertsService.instance) {
      AlertsService.instance = new AlertsService();
    }
    return AlertsService.instance;
  }

  // Carica tutte le notifiche
  async getAlerts(): Promise<Alert[]> {
    try {
      const alertsJson = await AsyncStorage.getItem(this.STORAGE_KEY);
      return alertsJson ? JSON.parse(alertsJson) : [];
    } catch (error) {
      console.error('Error loading alerts:', error);
      return [];
    }
  }

  // Salva le notifiche
  private async saveAlerts(alerts: Alert[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(alerts));
    } catch (error) {
      console.error('Error saving alerts:', error);
    }
  }

  // Aggiunge una nuova notifica
  async addAlert(alert: Omit<Alert, 'id' | 'timestamp' | 'read'>): Promise<void> {
    const alerts = await this.getAlerts();
    const newAlert: Alert = {
      ...alert,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    alerts.unshift(newAlert);
    await this.saveAlerts(alerts);
  }

  // Segna una notifica come letta
  async markAsRead(alertId: string): Promise<void> {
    const alerts = await this.getAlerts();
    const updatedAlerts = alerts.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    );
    await this.saveAlerts(updatedAlerts);
  }

  // Elimina una notifica
  async deleteAlert(alertId: string): Promise<void> {
    const alerts = await this.getAlerts();
    const filteredAlerts = alerts.filter(alert => alert.id !== alertId);
    await this.saveAlerts(filteredAlerts);
  }

  // Segna tutte le notifiche come lette
  async markAllAsRead(): Promise<void> {
    const alerts = await this.getAlerts();
    const updatedAlerts = alerts.map(alert => ({ ...alert, read: true }));
    await this.saveAlerts(updatedAlerts);
  }

  // Elimina tutte le notifiche
  async deleteAllAlerts(): Promise<void> {
    await this.saveAlerts([]);
  }
}

export const alertsService = AlertsService.getInstance();
