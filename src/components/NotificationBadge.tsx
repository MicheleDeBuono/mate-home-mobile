import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { alertsService } from '../services/alerts.service';

export default function NotificationBadge() {
  const [unreadCount, setUnreadCount] = useState(0);

  const updateUnreadCount = async () => {
    const alerts = await alertsService.getAlerts();
    const count = alerts.filter(alert => !alert.read).length;
    setUnreadCount(count);
  };

  useEffect(() => {
    updateUnreadCount();
    // Aggiorna il conteggio ogni 5 secondi
    const interval = setInterval(updateUnreadCount, 5000);
    return () => clearInterval(interval);
  }, []);

  if (unreadCount === 0) return null;

  return (
    <Badge
      size={16}
      style={styles.badge}
    >
      {unreadCount}
    </Badge>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#F44336',
    position: 'absolute',
    top: -4,
    right: -4,
  },
});
