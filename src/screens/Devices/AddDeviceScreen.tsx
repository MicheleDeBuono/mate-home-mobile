import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Snackbar } from 'react-native-paper';
import DeviceForm from '../../components/DeviceForm';
import { deviceService } from '../../services/device.service';

const AddDeviceScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      await deviceService.addDevice(data);
      navigation.goBack();
    } catch (err: any) {
      setError(err.message || 'Errore durante l\'aggiunta del dispositivo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Aggiungi dispositivo" />
      </Appbar.Header>

      <DeviceForm
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
        isLoading={loading}
      />

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
});

export default AddDeviceScreen;
