import axios from 'axios';
import { config } from '../config/config';

const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface RadarReading {
  sname: {
    S: string;
  };
  ts: {
    S: string;
  };
  Activity: {
    M: {
      activity: {
        M: {
          all: {
            L: Array<{ N: string }>;
          };
          breath: {
            L: Array<{ N: string }>;
          };
        };
      };
    };
  };
}

export interface ActiveScenario {
  type: string;
  startTime: string;
  duration: number;
  room: string;
}

export interface DeviceActivity {
  all: number;
  breath: number;
}

export interface DeviceReading {
  activity: DeviceActivity;
  deviceId: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
}

export interface DeviceReadingsResponse {
  [deviceId: string]: DeviceReading;
}

export interface HistoricalReading {
  time: string;
  deviceId: string;
  activitySeconds: number;
  breathSeconds: number;
}

export interface DailyStats {
  date: string;
  deviceId: string;
  totalActivitySeconds: number;
  totalBreathSeconds: number;
  readingsCount: number;
  averageActivitySeconds: number;
  averageBreathSeconds: number;
}

class ApiService {
  // Letture in tempo reale
  async getLatestReadings(): Promise<DeviceReading[]> {
    try {
      const response = await api.get<ApiResponse<DeviceReadingsResponse>>('/devices/readings/current');
      console.log('API Response:', response.data);
      
      // Convert the object to an array
      return Object.values(response.data.data);
    } catch (error) {
      console.error('ApiService.getLatestReadings error:', error);
      throw error;
    }
  }

  // Scenario attivo di un dispositivo
  async getDeviceScenario(deviceId: string): Promise<ActiveScenario | undefined> {
    const response = await api.get(`/devices/${deviceId}/scenario`);
    return response.data.scenario;
  }

  // Letture storiche
  async getHistoricalReadings(params: {
    deviceId?: string;
    start: string;
    end: string;
    window?: string;
  }): Promise<HistoricalReading[]> {
    try {
      if (!params.deviceId) {
        throw new Error('deviceId is required');
      }

      console.log('Requesting historical data:', params);
      const response = await api.get<ApiResponse<HistoricalReading[]>>(`/history/${params.deviceId}`, {
        params: {
          start: params.start,
          end: params.end,
          window: params.window
        }
      });

      if (!response.data.success) {
        throw new Error('Failed to fetch historical data');
      }

      console.log('Historical data response:', response.data);
      return response.data.data || [];
    } catch (error) {
      console.error('ApiService.getHistoricalReadings error:', error);
      throw error;
    }
  }

  // Statistiche giornaliere
  async getDailyStats(deviceId: string, date: string): Promise<DailyStats> {
    const response = await api.get('/history/daily', {
      params: { deviceId, date }
    });
    return response.data.stats;
  }

  // Helper per formattare i dati
  formatActivityData(reading: RadarReading) {
    return {
      activity: parseInt(reading.Activity.M.activity.M.all.L[0].N),
      breath: parseInt(reading.Activity.M.activity.M.breath.L[0].N),
      timestamp: new Date(reading.ts.S)
    };
  }
}

export default new ApiService();
