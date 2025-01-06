import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appbar, Card, Title, Paragraph, Button, Portal, Dialog, Text, ActivityIndicator, Snackbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { deviceService } from '../../services/device.service';
import { Device } from '../../types/device';

const DeviceDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const deviceId = route.params?.deviceId;

  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const loadDevice = useCallback(async () => {
    try {
      const data = await deviceService.getDevice(deviceId);
      setDevice(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Errore durante il caricamento del dispositivo');
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadDevice();
    setRefreshing(false);
  }, [loadDevice]);

  useEffect(() => {
    loadDevice();
  }, [loadDevice]);

  const handleEdit = () => {
    navigation.navigate('EditDevice', { deviceId });
  };

  const handleDelete = async () => {
    setShowDeleteDialog(false);
    setLoading(true);
    try {
      await deviceService.deleteDevice(deviceId);
      navigation.goBack();
    } catch (err: any) {
      setError(err.message || 'Errore durante l\'eliminazione del dispositivo');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.errorContainer}>
        <Text>Dispositivo non trovato</Text>
        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
          Torna indietro
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View>
              <Title>{device.name}</Title>
              <Paragraph style={styles.type}>{device.type}</Paragraph>
            </View>
            <Button icon="pencil" mode="contained" onPress={handleEdit} />
          </View>

          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: device.status === 'online' ? '#4CAF50' : '#F44336' }]} />
            <Paragraph style={styles.status}>{device.status === 'online' ? 'Online' : 'Offline'}</Paragraph>
          </View>

          <Title style={styles.sectionTitle}>Letture attuali</Title>
          <View style={styles.readings}>
            {device.temperature && (
              <View style={styles.reading}>
                <Ionicons name="thermometer" size={24} />
                <Paragraph>{device.temperature}</Paragraph>
              </View>
            )}
            {device.humidity && (
              <View style={styles.reading}>
                <Ionicons name="water" size={24} />
                <Paragraph>{device.humidity}</Paragraph>
              </View>
            )}
            <View style={styles.reading}>
              <Ionicons name="battery" size={24} />
              <Paragraph>{device.battery}%</Paragraph>
            </View>
          </View>

          <Title style={styles.sectionTitle}>Informazioni</Title>
          <View style={styles.info}>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Posizione:</Paragraph>
              <Paragraph>{device.location}</Paragraph>
            </View>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Ultimo aggiornamento:</Paragraph>
              <Paragraph>{new Date(device.lastUpdate).toLocaleString()}</Paragraph>
            </View>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Numero seriale:</Paragraph>
              <Paragraph>{device.serialNumber}</Paragraph>
            </View>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Versione firmware:</Paragraph>
              <Paragraph>{device.firmwareVersion}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.dangerZone]}>
        <Card.Content>
          <Title style={styles.dangerTitle}>Zona pericolosa</Title>
          <Button mode="contained" onPress={() => setShowDeleteDialog(true)} buttonColor="#F44336" style={styles.deleteButton}>
            Elimina dispositivo
          </Button>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Title>Elimina dispositivo</Dialog.Title>
          <Dialog.Content>
            <Text>Sei sicuro di voler eliminare questo dispositivo? Questa azione non può essere annullata.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Annulla</Button>
            <Button onPress={handleDelete} textColor="#F44336">Elimina</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  type: {
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  status: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  readings: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  reading: {
    alignItems: 'center',
  },
  info: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#666',
    marginRight: 16,
  },
  dangerZone: {
    marginTop: 24,
  },
  dangerTitle: {
    color: '#F44336',
  },
  deleteButton: {
    marginTop: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default DeviceDetailScreen;
