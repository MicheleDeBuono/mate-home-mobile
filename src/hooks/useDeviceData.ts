import { useState, useEffect } from 'react';
import apiService, { DeviceReading, HistoricalReading } from '../services/api.service';

export function useDeviceData(deviceId?: string) {
  const [data, setData] = useState<DeviceReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching latest readings...');
        const readings = await apiService.getLatestReadings();
        console.log('Received readings:', readings);
        
        if (deviceId) {
          setData(readings.filter(r => r.deviceId === deviceId));
        } else {
          setData(readings);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Aggiorna ogni minuto

    return () => clearInterval(interval);
  }, [deviceId]);

  return { data, loading, error };
}

export function useDeviceHistory(params: {
  deviceId?: string;
  start: string;
  end: string;
  window?: string;
}) {
  const [data, setData] = useState<HistoricalReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTime;
    
    // Only fetch if more than 5 seconds have passed since last fetch
    if (timeSinceLastFetch < 5000) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching historical readings with params:', params);
        const readings = await apiService.getHistoricalReadings(params);
        console.log('Received historical readings:', readings);
        
        if (isMounted) {
          setData(readings || []);
          setError(null);
          setLastFetchTime(Date.now());
        }
      } catch (err) {
        console.error('Error fetching historical data:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error fetching historical data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [params.deviceId, params.start, params.end, params.window, lastFetchTime]);

  return { data, loading, error };
}

export function useDeviceStats(deviceId: string, date: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching daily stats for device', deviceId, 'on date', date);
        const stats = await apiService.getDailyStats(deviceId, date);
        console.log('Received daily stats:', stats);
        setData(stats);
        setError(null);
      } catch (err) {
        console.error('Error fetching daily stats:', err);
        setError(err instanceof Error ? err.message : 'Error fetching daily stats');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deviceId, date]);

  return { data, loading, error };
}
