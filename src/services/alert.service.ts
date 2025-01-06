// Mock data per gli avvisi
const mockAlerts = [
  {
    id: '1',
    deviceId: '1',
    type: 'motion_detected',
    severity: 'high',
    message: 'Rilevato movimento in cucina',
    timestamp: new Date().toISOString(),
    read: false,
    resolved: false,
  },
  {
    id: '2',
    deviceId: '2',
    type: 'low_battery',
    severity: 'medium',
    message: 'Batteria scarica nel sensore del soggiorno',
    timestamp: new Date().toISOString(),
    read: false,
    resolved: false,
  },
  {
    id: '3',
    deviceId: '3',
    type: 'door_opened',
    severity: 'high',
    message: 'Porta principale aperta',
    timestamp: new Date().toISOString(),
    read: true,
    resolved: true,
  },
];

class AlertService {
  private alerts = [...mockAlerts];

  async getAlerts(filters?: any): Promise<any[]> {
    let filteredAlerts = [...this.alerts];

    if (filters) {
      if (filters.deviceId) {
        filteredAlerts = filteredAlerts.filter(alert => alert.deviceId === filters.deviceId);
      }
      if (filters.read !== undefined) {
        filteredAlerts = filteredAlerts.filter(alert => alert.read === filters.read);
      }
      if (filters.resolved !== undefined) {
        filteredAlerts = filteredAlerts.filter(alert => alert.resolved === filters.resolved);
      }
      if (filters.severity) {
        filteredAlerts = filteredAlerts.filter(alert => alert.severity === filters.severity);
      }
      if (filters.days) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - filters.days);
        filteredAlerts = filteredAlerts.filter(alert => 
          new Date(alert.timestamp) >= cutoffDate
        );
      }
    }

    return Promise.resolve(filteredAlerts.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  }

  async getAlert(id: string): Promise<any> {
    const alert = this.alerts.find(a => a.id === id);
    return Promise.resolve(alert || null);
  }

  async markAsRead(id: string): Promise<boolean> {
    const alert = this.alerts.find(a => a.id === id);
    if (!alert) return Promise.resolve(false);

    alert.read = true;
    return Promise.resolve(true);
  }

  async markAsResolved(id: string): Promise<boolean> {
    const alert = this.alerts.find(a => a.id === id);
    if (!alert) return Promise.resolve(false);

    alert.resolved = true;
    return Promise.resolve(true);
  }

  async deleteAlert(id: string): Promise<boolean> {
    const index = this.alerts.findIndex(a => a.id === id);
    if (index === -1) return Promise.resolve(false);

    this.alerts.splice(index, 1);
    return Promise.resolve(true);
  }

  async markAllAsRead(): Promise<void> {
    this.alerts = this.alerts.map(alert => ({
      ...alert,
      read: true,
    }));
    return Promise.resolve();
  }

  async getAlertStats(): Promise<any> {
    return Promise.resolve({
      total: this.alerts.length,
      unread: this.alerts.filter(a => !a.read).length,
      byDevice: this.alerts.reduce((acc: any, alert) => {
        acc[alert.deviceId] = (acc[alert.deviceId] || 0) + 1;
        return acc;
      }, {}),
      bySeverity: this.alerts.reduce((acc: any, alert) => {
        acc[alert.severity] = (acc[alert.severity] || 0) + 1;
        return acc;
      }, {}),
    });
  }

  // Metodo per simulare l'aggiunta di un nuovo avviso
  async addMockAlert(alert: any): Promise<any> {
    const newAlert = {
      id: (this.alerts.length + 1).toString(),
      ...alert,
      timestamp: new Date().toISOString(),
      read: false,
      resolved: false,
    };
    this.alerts.unshift(newAlert);
    return Promise.resolve(newAlert);
  }
}

export const alertService = new AlertService();
