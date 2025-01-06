import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, useTheme, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { useDeviceData, useDeviceHistory } from '../../hooks/useDeviceData';
import ActivityChart from '../../components/ActivityChart';
import { format, subHours, startOfDay, endOfDay } from 'date-fns';
import { it } from 'date-fns/locale';

const DEVICE_ID = 'MATE_MAIN_001';

export default function RoomDetailScreen() {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('1h');
  const [refreshing, setRefreshing] = useState(false);

  const { data: currentData, loading: currentLoading, error: currentError } = useDeviceData(DEVICE_ID);
  const currentReading = currentData?.[0];

  const timeRangeParams = useMemo(() => {
    const now = new Date();
    switch (timeRange) {
      case '1h':
        return { start: subHours(now, 1).toISOString(), end: now.toISOString(), window: '5m' };
      case '6h':
        return { start: subHours(now, 6).toISOString(), end: now.toISOString(), window: '15m' };
      case '24h':
        return { start: subHours(now, 24).toISOString(), end: now.toISOString(), window: '1h' };
      case 'day':
        return { 
          start: startOfDay(now).toISOString(), 
          end: endOfDay(now).toISOString(),
          window: '1h'
        };
      default:
        return { start: subHours(now, 1).toISOString(), end: now.toISOString(), window: '5m' };
    }
  }, [timeRange]);

  const { data: historyData, loading: historyLoading } = useDeviceHistory({
    deviceId: DEVICE_ID,
    ...timeRangeParams
  });

  const chartData = useMemo(() => {
    if (!historyData || !Array.isArray(historyData)) {
      console.log('No history data available or invalid format');
      return [];
    }

    return historyData
      .map(item => {
        if (!item || typeof item !== 'object') {
          console.log('Invalid history item:', item);
          return null;
        }

        const { time, activitySeconds, breathSeconds } = item;
        if (!time || !Number.isFinite(activitySeconds) || !Number.isFinite(breathSeconds)) {
          console.log('Invalid data in history item:', item);
          return null;
        }

        return {
          time,
          activitySeconds,
          breathSeconds,
          deviceId: DEVICE_ID
        };
      })
      .filter(Boolean);
  }, [historyData]);

  console.log('Chart data prepared:', {
    itemCount: chartData.length,
    firstItem: chartData[0],
    lastItem: chartData[chartData.length - 1]
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const formatActivity = (reading: any) => {
    try {
      const activity = reading?.activity?.all;
      return activity && activity > 0 ? 'Attivo' : 'Inattivo';
    } catch (error) {
      console.error('Error formatting activity:', error);
      return 'N/D';
    }
  };

  const getScenarioInfo = (activity?: any) => {
    if (!activity) return { icon: 'account-off', text: 'N/D', color: colors.absence };
    
    const isActive = activity.all > 0;
    const hasBreath = activity.breath > 0;
    
    if (!isActive) {
      return { icon: 'account-off', text: 'Assente', color: colors.absence };
    } else if (activity.all > 15) {
      return { icon: 'account-alert', text: 'Agitato', color: colors.warning };
    } else if (hasBreath && activity.all < 5) {
      return { icon: 'sleep', text: 'Riposo profondo', color: colors.info };
    } else {
      return { icon: 'account', text: 'Presente', color: colors.presence };
    }
  };

  const renderTimeRangeButtons = () => (
    <View style={styles.timeRangeContainer}>
      <Button 
        mode={timeRange === '1h' ? 'contained' : 'outlined'} 
        onPress={() => setTimeRange('1h')}
        style={styles.timeButton}
      >
        1h
      </Button>
      <Button 
        mode={timeRange === '6h' ? 'contained' : 'outlined'} 
        onPress={() => setTimeRange('6h')}
        style={styles.timeButton}
      >
        6h
      </Button>
      <Button 
        mode={timeRange === '24h' ? 'contained' : 'outlined'} 
        onPress={() => setTimeRange('24h')}
        style={styles.timeButton}
      >
        24h
      </Button>
      <Button 
        mode={timeRange === 'day' ? 'contained' : 'outlined'} 
        onPress={() => setTimeRange('day')}
        style={styles.timeButton}
      >
        Oggi
      </Button>
    </View>
  );

  if (currentError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Title style={styles.title}>Errore</Title>
          <Paragraph>Si è verificato un errore nel caricamento dei dati.</Paragraph>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Title style={styles.title}>Stato Attuale</Title>
        
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.headerContainer}>
              <Title>Stanza Principale</Title>
              {currentReading && (
                <MaterialCommunityIcons 
                  name={getScenarioInfo(currentReading.activity).icon}
                  size={24}
                  color={getScenarioInfo(currentReading.activity).color}
                />
              )}
            </View>
            
            {currentReading && (
              <View style={styles.statusContainer}>
                <View style={styles.statusItem}>
                  <MaterialCommunityIcons 
                    name="heart-pulse" 
                    size={24} 
                    color={colors.info}
                  />
                  <Paragraph style={styles.statusText}>
                    {formatActivity(currentReading)}
                  </Paragraph>
                </View>

                <View style={styles.statusItem}>
                  <MaterialCommunityIcons 
                    name="clock-outline" 
                    size={24} 
                    color={colors.info}
                  />
                  <Paragraph style={styles.statusText}>
                    {format(new Date(currentReading.timestamp), 'HH:mm', { locale: it })}
                  </Paragraph>
                </View>

                <View style={styles.statusItem}>
                  <MaterialCommunityIcons 
                    name="radar" 
                    size={24} 
                    color={colors.info}
                  />
                  <Paragraph style={styles.statusText}>
                    {currentReading.activity?.breath?.toFixed(1)}s
                  </Paragraph>
                </View>
              </View>
            )}
          </Card.Content>
        </Card>

        <View style={styles.chartContainer}>
          <Title style={styles.chartTitle}>Storico Attività</Title>
          {renderTimeRangeButtons()}
          
          <Card style={styles.chartCard}>
            <Card.Content>
              {historyLoading ? (
                <View style={styles.loadingContainer}>
                  <Paragraph>Caricamento dati...</Paragraph>
                </View>
              ) : chartData.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Paragraph>Nessun dato disponibile per il periodo selezionato</Paragraph>
                </View>
              ) : (
                <ActivityChart data={chartData} />
              )}
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    alignItems: 'center',
  },
  statusText: {
    marginTop: 4,
    color: colors.text.secondary,
  },
  chartContainer: {
    marginTop: 24,
  },
  chartTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  chartCard: {
    elevation: 4,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
});
