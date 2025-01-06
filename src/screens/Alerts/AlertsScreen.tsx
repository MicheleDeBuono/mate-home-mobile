import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { Title, Card, Paragraph, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { randomAlertsService } from '../../services/random-alerts.service';

export default function AlertsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'Movimento Rilevato',
      description: 'Rilevato movimento nella stanza principale',
      timestamp: '2 minuti fa',
      type: 'movement',
      read: false,
    },
    {
      id: 2,
      title: 'Bagno Occupato',
      description: 'Il bagno è stato occupato per più di 30 minuti',
      timestamp: '1 ora fa',
      type: 'bathroom',
      read: true,
    },
    {
      id: 3,
      title: 'Temperatura Alta',
      description: 'La temperatura nella stanza principale è sopra i 25°C',
      timestamp: '2 ore fa',
      type: 'temperature',
      read: true,
    },
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    randomAlertsService.generateOne().then((newAlert) => {
      setAlerts(prev => [newAlert, ...prev]);
      setRefreshing(false);
    });
  }, []);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'movement':
        return 'run';
      case 'bathroom':
        return 'toilet';
      case 'temperature':
        return 'thermometer';
      default:
        return 'bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'movement':
        return colors.info;
      case 'bathroom':
        return colors.warning;
      case 'temperature':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Title style={styles.title}>Notifiche</Title>
          <IconButton 
            icon="reload" 
            size={24}
            iconColor={colors.primary}
            onPress={onRefresh}
          />
        </View>

        {alerts.map((alert) => (
          <Card 
            key={alert.id} 
            style={[
              styles.card,
              !alert.read && styles.unreadCard
            ]}
          >
            <Card.Content>
              <View style={styles.alertHeader}>
                <View style={styles.alertTitleContainer}>
                  <MaterialCommunityIcons 
                    name={getAlertIcon(alert.type)} 
                    size={24} 
                    color={getAlertColor(alert.type)}
                    style={styles.icon}
                  />
                  <Title style={styles.alertTitle}>{alert.title}</Title>
                </View>
                {!alert.read && (
                  <View style={styles.unreadDot} />
                )}
              </View>
              
              <Paragraph style={styles.description}>{alert.description}</Paragraph>
              <Paragraph style={styles.timestamp}>{alert.timestamp}</Paragraph>
            </Card.Content>
          </Card>
        ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    color: colors.text.primary,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: colors.surface,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  alertTitle: {
    fontSize: 18,
  },
  description: {
    color: colors.text.secondary,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
