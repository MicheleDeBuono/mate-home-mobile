// Mock data per i dispositivi
const mockDevices = [
  {
    id: '1',
    name: 'Sensore Cucina',
    type: 'motion_sensor',
    location: 'Cucina',
    status: 'online',
    battery: 85,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Sensore Soggiorno',
    type: 'motion_sensor',
    location: 'Soggiorno',
    status: 'online',
    battery: 15,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Sensore Porta',
    type: 'door_sensor',
    location: 'Ingresso',
    status: 'offline',
    battery: 50,
    lastUpdate: new Date().toISOString(),
  },
];

class DeviceService {
  private devices = [...mockDevices];

  async getDevices(filters?: any): Promise<any[]> {
    let filteredDevices = [...this.devices];

    if (filters) {
      if (filters.type) {
        filteredDevices = filteredDevices.filter(device => device.type === filters.type);
      }
      if (filters.location) {
        filteredDevices = filteredDevices.filter(device => device.location === filters.location);
      }
      if (filters.status) {
        filteredDevices = filteredDevices.filter(device => device.status === filters.status);
      }
    }

    return Promise.resolve(filteredDevices);
  }

  async getDevice(id: string): Promise<any> {
    const device = this.devices.find(d => d.id === id);
    return Promise.resolve(device || null);
  }

  async addDevice(deviceData: any): Promise<any> {
    const newDevice = {
      id: (this.devices.length + 1).toString(),
      ...deviceData,
      status: 'offline',
      lastUpdate: new Date().toISOString(),
    };
    this.devices.push(newDevice);
    return Promise.resolve(newDevice);
  }

  async updateDevice(id: string, updates: any): Promise<any> {
    const device = this.devices.find(d => d.id === id);
    if (!device) return Promise.resolve(null);

    Object.assign(device, updates, {
      lastUpdate: new Date().toISOString(),
    });

    return Promise.resolve(device);
  }

  async deleteDevice(id: string): Promise<boolean> {
    const index = this.devices.findIndex(d => d.id === id);
    if (index === -1) return Promise.resolve(false);

    this.devices.splice(index, 1);
    return Promise.resolve(true);
  }

  async getDeviceStats(): Promise<any> {
    return Promise.resolve({
      total: this.devices.length,
      online: this.devices.filter(d => d.status === 'online').length,
      byType: this.devices.reduce((acc: any, device) => {
        acc[device.type] = (acc[device.type] || 0) + 1;
        return acc;
      }, {}),
      byLocation: this.devices.reduce((acc: any, device) => {
        acc[device.location] = (acc[device.location] || 0) + 1;
        return acc;
      }, {}),
      lowBattery: this.devices.filter(d => d.battery < 20).length,
    });
  }

  // Metodo per simulare il cambiamento di stato di un dispositivo
  async updateDeviceStatus(id: string, status: 'online' | 'offline'): Promise<any> {
    const device = this.devices.find(d => d.id === id);
    if (!device) return Promise.resolve(null);

    device.status = status;
    device.lastUpdate = new Date().toISOString();

    return Promise.resolve(device);
  }
}

export const deviceService = new DeviceService();
