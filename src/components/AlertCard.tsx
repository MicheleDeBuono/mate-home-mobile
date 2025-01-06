import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from '../types/alert';

interface AlertCardProps {
  alert: Alert;
  onPress: () => void;
  onMarkAsRead?: () => void;
  onMarkAsResolved?: () => void;
}

const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case 'motion_detected':
      return 'walk';
    case 'door_opened':
      return 'door';
    case 'window_opened':
      return 'apps';
    case 'low_battery':
      return 'battery-dead';
    case 'offline':
      return 'cloud-offline';
    default:
      return 'warning';
  }
};

const getSeverityColor = (severity: Alert['severity']) => {
  switch (severity) {
    case 'high':
      return '#F44336';
    case 'medium':
      return '#FF9800';
    case 'low':
      return '#4CAF50';
    default:
      return '#757575';
  }
};

const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onPress,
  onMarkAsRead,
  onMarkAsResolved,
}) => {
  const alertColor = getSeverityColor(alert.severity);

  return (
    <Card
      style={[
        styles.card,
        !alert.read && styles.unreadCard,
        alert.resolved && styles.resolvedCard,
      ]}
      onPress={onPress}
    >
      <View style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: alertColor + '20' }]}>
          <Ionicons
            name={getAlertIcon(alert.type)}
            size={24}
            color={alertColor}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.message} numberOfLines={2}>
            {alert.message}
          </Text>
          <Text style={styles.timestamp}>
            {new Date(alert.timestamp).toLocaleString()}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          {!alert.read && onMarkAsRead && (
            <IconButton
              icon="eye"
              size={20}
              onPress={(e) => {
                e.stopPropagation();
                onMarkAsRead();
              }}
            />
          )}
          {!alert.resolved && onMarkAsResolved && (
            <IconButton
              icon="check-circle"
              size={20}
              onPress={(e) => {
                e.stopPropagation();
                onMarkAsResolved();
              }}
            />
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  resolvedCard: {
    opacity: 0.7,
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#757575',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
});

export default AlertCard;
