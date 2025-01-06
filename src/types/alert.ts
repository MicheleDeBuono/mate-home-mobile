export interface Alert {
  id: string;
  deviceId: string;
  type: 'motion_detected' | 'door_opened' | 'window_opened' | 'low_battery' | 'offline' | 'custom';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  read: boolean;
  resolved: boolean;
}

export interface AlertStats {
  total: number;
  unread: number;
  byDevice: {
    [deviceId: string]: number;
  };
  bySeverity: {
    low: number;
    medium: number;
    high: number;
  };
}
