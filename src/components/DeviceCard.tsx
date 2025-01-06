import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Device } from '../types/device';

interface DeviceCardProps {
  device: Device;
  onPress: () => void;
}

const getDeviceIcon = (type: Device['type']) => {
  switch (type) {
    case 'camera':
      return 'camera';
    case 'motion_sensor':
      return 'walk';
    case 'door_sensor':
      return 'door';
    case 'window_sensor':
      return 'apps';
    default:
      return 'hardware-chip';
  }
};

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={getDeviceIcon(device.type)} 
          size={24} 
          color={device.status === 'online' ? '#4CAF50' : '#9E9E9E'} 
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{device.name}</Text>
        <Text style={styles.location}>{device.location}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: device.status === 'online' ? '#4CAF50' : '#9E9E9E' }]} />
          <Text style={styles.status}>{device.status === 'online' ? 'Online' : 'Offline'}</Text>
        </View>
      </View>
      {device.battery !== undefined && (
        <View style={styles.batteryContainer}>
          <Ionicons 
            name={device.battery > 20 ? 'battery-full' : 'battery-dead'} 
            size={20} 
            color={device.battery > 20 ? '#4CAF50' : '#F44336'} 
          />
          <Text style={[styles.battery, { color: device.battery > 20 ? '#4CAF50' : '#F44336' }]}>
            {device.battery}%
          </Text>
        </View>
      )}
      {device.alerts > 0 && (
        <View style={styles.alertBadge}>
          <Text style={styles.alertText}>{device.alerts}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  location: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  status: {
    fontSize: 12,
    color: '#757575',
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    right: 16,
  },
  battery: {
    fontSize: 12,
    marginLeft: 4,
  },
  alertBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#F44336',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  alertText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DeviceCard;
