import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appbar, Snackbar, ActivityIndicator } from 'react-native-paper';
import DeviceForm from '../../components/DeviceForm';
import { deviceService } from '../../services/device.service';
import { Device } from '../../types/device';

const EditDeviceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const deviceId = route.params?.deviceId;

  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDevice = async () => {
      try {
        const data = await deviceService.getDevice(deviceId);
        setDevice(data);
      } catch (err: any) {
        setError(err.message || 'Errore durante il caricamento del dispositivo');
      } finally {
        setLoading(false);
      }
    };

    loadDevice();
  }, [deviceId]);

  const handleSubmit = async (data: Partial<Device>) => {
    setSaving(true);
    setError(null);
    try {
      await deviceService.updateDevice(deviceId, data);
      navigation.goBack();
    } catch (err: any) {
      setError(err.message || 'Errore durante l\'aggiornamento del dispositivo');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Modifica dispositivo" />
      </Appbar.Header>

      {device && (
        <DeviceForm
          initialValues={{
            name: device.name,
            location: device.location,
            type: device.type,
          }}
          onSubmit={handleSubmit}
          onCancel={() => navigation.goBack()}
          isLoading={saving}
        />
      )}

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
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditDeviceScreen;
