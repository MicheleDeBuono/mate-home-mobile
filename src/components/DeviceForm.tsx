import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, HelperText, Divider, List } from 'react-native-paper';
import { Device } from '../types/device';

type DeviceFormData = Omit<Device, 'id' | 'status' | 'lastUpdate' | 'alerts'>;

interface DeviceFormProps {
  initialValues?: Partial<DeviceFormData>;
  onSubmit: (data: DeviceFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const deviceTypes = [
  { label: 'Telecamera', value: 'camera' },
  { label: 'Sensore di movimento', value: 'motion_sensor' },
  { label: 'Sensore porta', value: 'door_sensor' },
  { label: 'Sensore finestra', value: 'window_sensor' },
];

const DeviceForm: React.FC<DeviceFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [location, setLocation] = useState(initialValues?.location || '');
  const [type, setType] = useState(initialValues?.type || 'camera');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof DeviceFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof DeviceFormData, string>> = {};

    if (!name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }
    if (!location.trim()) {
      newErrors.location = 'La posizione è obbligatoria';
    }
    if (!type) {
      newErrors.type = 'Il tipo è obbligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        name: name.trim(),
        location: location.trim(),
        type,
        battery: 100,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Nome dispositivo"
        value={name}
        onChangeText={setName}
        mode="outlined"
        error={!!errors.name}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.name}>
        {errors.name}
      </HelperText>

      <TextInput
        label="Posizione"
        value={location}
        onChangeText={setLocation}
        mode="outlined"
        error={!!errors.location}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.location}>
        {errors.location}
      </HelperText>

      <List.Accordion
        title={`Tipo: ${deviceTypes.find(t => t.value === type)?.label || ''}`}
        expanded={showTypeDropdown}
        onPress={() => setShowTypeDropdown(!showTypeDropdown)}
        style={styles.typeSelector}
      >
        {deviceTypes.map((deviceType) => (
          <List.Item
            key={deviceType.value}
            title={deviceType.label}
            onPress={() => {
              setType(deviceType.value);
              setShowTypeDropdown(false);
            }}
          />
        ))}
      </List.Accordion>
      <HelperText type="error" visible={!!errors.type}>
        {errors.type}
      </HelperText>

      <Divider style={styles.divider} />

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={onCancel}
          style={[styles.button, styles.cancelButton]}
          disabled={isLoading}
        >
          Annulla
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          loading={isLoading}
          disabled={isLoading}
        >
          {initialValues ? 'Aggiorna' : 'Aggiungi'}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 4,
  },
  typeSelector: {
    backgroundColor: '#f5f5f5',
    marginTop: 8,
  },
  divider: {
    marginVertical: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    borderColor: '#757575',
  },
});

export default DeviceForm;
