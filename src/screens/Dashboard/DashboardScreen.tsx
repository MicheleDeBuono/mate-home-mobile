import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, ActivityIndicator, Snackbar } from 'react-native-paper';
import StatCard from '../../components/stats/StatCard';
import VitalsCard from '../../components/stats/VitalsCard';
import QuickActions from '../../components/QuickActions';
import AlertsChart from '../../components/stats/AlertsChart';
import DeviceStatusChart from '../../components/stats/DeviceStatusChart';
import { deviceService } from '../../services/device.service';
import { alertService } from '../../services/alert.service';
import { vitalsService } from '../../services/vitals.service';
import { useRealTimeAlerts } from '../../hooks/useRealTimeAlerts';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [deviceStats, setDeviceStats] = useState<any>(null);
  const [alertStats, setAlertStats] = useState<any>(null);
  const [alertsHistory, setAlertsHistory] = useState<any>(null);
  const [vitals, setVitals] = useState<any>(null);

  const loadData = useCallback(async () => {
    try {
      const [devices, alerts, history, vitalsData] = await Promise.all([
        deviceService.getDeviceStats(),
        alertService.getAlertStats(),
        alertService.getAlerts({ days: 7 }),
        vitalsService.getVitals(),
      ]);

      setDeviceStats(devices);
      setAlertStats(alerts);
      setVitals(vitalsData);

      // Processa la cronologia degli avvisi
      const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const alertsByDay = history.reduce((acc: any, alert: any) => {
        const day = new Date(alert.timestamp).toISOString().split('T')[0];
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});

      setAlertsHistory({
        labels: days.map(day => day.split('-')[2]),
        datasets: [{
          data: days.map(day => alertsByDay[day] || 0),
        }],
      });

      setError(null);
    } catch (err: any) {
      setError(err.message || 'Errore durante il caricamento dei dati');
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  // Gestione degli aggiornamenti in tempo reale
  const handleNewAlert = useCallback(() => {
    loadData(); // Ricarica tutti i dati quando arriva un nuovo avviso
  }, [loadData]);

  const handleDeviceUpdate = useCallback((update: any) => {
    if (deviceStats) {
      // Aggiorna le statistiche dei dispositivi
      setDeviceStats(prev => ({
        ...prev,
        online: update.online,
        offline: update.offline,
        lowBattery: update.lowBattery,
        total: update.total,
      }));
    }
  }, [deviceStats]);

  const handleStatsUpdate = useCallback((stats: any) => {
    setAlertStats(stats);
  }, []);

  useRealTimeAlerts({
    onNewAlert: handleNewAlert,
    onDeviceUpdate: handleDeviceUpdate,
    onStatsUpdate: handleStatsUpdate,
  });

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleEmergency = () => {
    Alert.alert(
      'Emergenza',
      'Vuoi chiamare il numero di emergenza?',
      [
        {
          text: 'Annulla',
          style: 'cancel',
        },
        {
          text: 'Chiama',
          onPress: () => Linking.openURL('tel:112'),
          style: 'destructive',
        },
      ]
    );
  };

  const handleCall = () => {
    Linking.openURL('tel:+393331234567'); // Numero del caregiver
  };

  const handleLocation = () => {
    navigation.navigate('Map'); // Naviga alla schermata della mappa
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Dashboard" />
      </Appbar.Header>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <QuickActions
          onEmergency={handleEmergency}
          onCall={handleCall}
          onLocation={handleLocation}
        />

        {vitals && (
          <VitalsCard
            heartRate={vitals.heartRate}
            steps={vitals.steps}
            location={vitals.location}
            lastUpdate={new Date(vitals.lastUpdate).toLocaleTimeString()}
            onPress={handleLocation}
          />
        )}

        <View style={styles.statsGrid}>
          <StatCard
            title="Dispositivi attivi"
            value={deviceStats?.online || 0}
            icon="hardware-chip"
            color="#4CAF50"
            subtitle="Dispositivi online"
            onPress={() => navigation.navigate('Devices')}
          />
          <StatCard
            title="Avvisi non letti"
            value={alertStats?.unread || 0}
            icon="notifications"
            color="#F44336"
            subtitle="Avvisi da controllare"
            onPress={() => navigation.navigate('Alerts')}
          />
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="Batteria bassa"
            value={deviceStats?.lowBattery || 0}
            icon="battery-dead"
            color="#FF9800"
            subtitle="Dispositivi da ricaricare"
          />
          <StatCard
            title="Offline"
            value={deviceStats?.offline || 0}
            icon="cloud-offline"
            color="#9E9E9E"
            subtitle="Dispositivi non raggiungibili"
          />
        </View>

        {alertsHistory && (
          <AlertsChart data={alertsHistory} />
        )}

        {deviceStats && (
          <DeviceStatusChart
            data={[
              {
                name: 'Online',
                count: deviceStats.online || 0,
                color: '#4CAF50',
              },
              {
                name: 'Offline',
                count: deviceStats.offline || 0,
                color: '#9E9E9E',
              },
              {
                name: 'Batteria bassa',
                count: deviceStats.lowBattery || 0,
                color: '#FF9800',
              },
            ]}
            total={deviceStats.total || 0}
          />
        )}
      </ScrollView>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        action={{
          label: 'OK',
          onPress: () => setError(null),
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    padding: 8,
  },
});

export default DashboardScreen;
