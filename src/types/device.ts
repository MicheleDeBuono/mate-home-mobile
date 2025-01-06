export interface Device {
  id: string;
  name: string;
  type: 'camera' | 'motion_sensor' | 'door_sensor' | 'window_sensor';
  location: string;
  status: 'online' | 'offline';
  battery?: number;
  lastUpdate: Date;
  alerts?: number;
}

export interface DeviceStats {
  totalDevices: number;
  onlineDevices: number;
  alertsToday: number;
  lowBatteryDevices: number;
}
