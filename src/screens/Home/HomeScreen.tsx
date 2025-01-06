import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDeviceData } from '../../hooks/useDeviceData';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';

const HomeScreen = () => {
  const { data: readings, loading, error } = useDeviceData();
  const navigation = useNavigation();
  const theme = useTheme();

  const getDeviceName = (deviceId: string) => {
    switch (deviceId) {
      case 'MATE_MAIN_001':
        return 'Stanza Principale';
      case 'MATE_MAIN_002':
        return 'Bagno';
      default:
        return deviceId;
    }
  };

  const getDeviceIcon = (deviceId: string) => {
    switch (deviceId) {
      case 'MATE_MAIN_001':
        return 'bed';
      case 'MATE_MAIN_002':
        return 'shower';
      default:
        return 'radar';
    }
  };

  const getStatusInfo = (activity?: { all: number; breath: number }) => {
    if (!activity) return { icon: 'account-off', text: 'N/D', color: theme.colors.error };
    
    const isActive = activity.all > 0;
    const hasBreath = activity.breath > 0;
    
    if (!isActive) {
      return { icon: 'account-off', text: 'Assente', color: theme.colors.error };
    } else if (activity.all > 15) {
      return { icon: 'account-alert', text: 'Agitato', color: theme.colors.warning };
    } else if (hasBreath && activity.all < 5) {
      return { icon: 'sleep', text: 'Riposo', color: theme.colors.info };
    } else {
      return { icon: 'account', text: 'Presente', color: theme.colors.success };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Title style={styles.title}>Casa</Title>
        </View>

        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Stanze</Title>
          {loading ? (
            <Card style={styles.loadingCard}>
              <Card.Content>
                <Text>Caricamento dispositivi...</Text>
              </Card.Content>
            </Card>
          ) : error ? (
            <Card style={styles.errorCard}>
              <Card.Content>
                <Text style={styles.errorText}>{error}</Text>
              </Card.Content>
            </Card>
          ) : readings.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Card.Content>
                <Text>Nessun dispositivo trovato</Text>
              </Card.Content>
            </Card>
          ) : (
            readings.map((device) => (
              <TouchableOpacity
                key={device.deviceId}
                onPress={() => {
                  navigation.navigate('RoomDetail', {
                    deviceId: device.deviceId,
                    roomName: getDeviceName(device.deviceId),
                  });
                }}
              >
                <Card style={styles.deviceCard}>
                  <Card.Content style={styles.deviceContent}>
                    <View style={styles.deviceInfo}>
                      <MaterialCommunityIcons
                        name={getDeviceIcon(device.deviceId)}
                        size={24}
                        color={colors.primary}
                      />
                      <Text style={styles.deviceName}>
                        {getDeviceName(device.deviceId)}
                      </Text>
                    </View>
                    <View style={styles.statusInfo}>
                      <MaterialCommunityIcons
                        name={getStatusInfo(device.activity).icon}
                        size={24}
                        color={getStatusInfo(device.activity).color}
                      />
                      <Text style={[styles.statusText, { color: getStatusInfo(device.activity).color }]}>
                        {getStatusInfo(device.activity).text}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: colors.text.primary,
  },
  loadingCard: {
    marginBottom: 16,
    elevation: 2,
  },
  errorCard: {
    marginBottom: 16,
    backgroundColor: '#ffebee',
    elevation: 2,
  },
  errorText: {
    color: '#c62828',
  },
  emptyCard: {
    marginBottom: 16,
    elevation: 2,
  },
  deviceCard: {
    marginBottom: 12,
    elevation: 2,
    backgroundColor: colors.surface,
  },
  deviceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceName: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen;
