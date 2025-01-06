import { useEffect, useCallback } from 'react';
import { socketService } from '../services/socket.service';
import { Alert } from '../types/alert';

interface UseRealTimeAlertsProps {
  onNewAlert?: (alert: Alert) => void;
  onDeviceUpdate?: (update: any) => void;
  onStatsUpdate?: (stats: any) => void;
}

export const useRealTimeAlerts = ({
  onNewAlert,
  onDeviceUpdate,
  onStatsUpdate,
}: UseRealTimeAlertsProps) => {
  const handleNewAlert = useCallback((alert: Alert) => {
    if (onNewAlert) {
      onNewAlert(alert);
    }
  }, [onNewAlert]);

  const handleDeviceUpdate = useCallback((update: any) => {
    if (onDeviceUpdate) {
      onDeviceUpdate(update);
    }
  }, [onDeviceUpdate]);

  const handleStatsUpdate = useCallback((stats: any) => {
    if (onStatsUpdate) {
      onStatsUpdate(stats);
    }
  }, [onStatsUpdate]);

  useEffect(() => {
    // Aggiungi i listener
    if (onNewAlert) {
      socketService.addListener('newAlert', handleNewAlert);
    }
    if (onDeviceUpdate) {
      socketService.addListener('deviceUpdate', handleDeviceUpdate);
    }
    if (onStatsUpdate) {
      socketService.addListener('statsUpdate', handleStatsUpdate);
    }

    // Cleanup
    return () => {
      if (onNewAlert) {
        socketService.removeListener('newAlert', handleNewAlert);
      }
      if (onDeviceUpdate) {
        socketService.removeListener('deviceUpdate', handleDeviceUpdate);
      }
      if (onStatsUpdate) {
        socketService.removeListener('statsUpdate', handleStatsUpdate);
      }
    };
  }, [handleNewAlert, handleDeviceUpdate, handleStatsUpdate]);

  return {
    isConnected: socketService.isConnected(),
  };
};
