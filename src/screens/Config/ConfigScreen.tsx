import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, TextInput, Button, Paragraph, Divider, IconButton, useTheme } from 'react-native-paper';

export default function ConfigScreen() {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  // In un'app reale, questi dati verrebbero dal backend
  const [config, setConfig] = useState({
    patient: {
      name: 'Mario Rossi',
      age: '75',
      notes: 'Paziente con difficoltà motorie',
    },
    mainRoom: {
      name: 'Soggiorno',
      deviceId: 'RADAR-001',
      deviceStatus: 'Online',
      lastMaintenance: '15/12/2023',
    },
    bathroom: {
      name: 'Bagno',
      deviceId: 'RADAR-002',
      deviceStatus: 'Online',
      lastMaintenance: '15/12/2023',
    },
  });

  const handleSave = () => {
    // In un'app reale, qui salveremmo i dati sul backend
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Configurazione Sistema</Title>

      {/* Configurazione Paziente */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerContainer}>
            <Title>Dati Paziente</Title>
            <IconButton
              icon={isEditing ? 'content-save' : 'pencil'}
              size={24}
              onPress={() => isEditing ? handleSave() : setIsEditing(true)}
            />
          </View>

          <TextInput
            label="Nome e Cognome"
            value={config.patient.name}
            onChangeText={(text) => setConfig({
              ...config,
              patient: { ...config.patient, name: text }
            })}
            disabled={!isEditing}
            style={styles.input}
          />

          <TextInput
            label="Età"
            value={config.patient.age}
            onChangeText={(text) => setConfig({
              ...config,
              patient: { ...config.patient, age: text }
            })}
            disabled={!isEditing}
            style={styles.input}
          />

          <TextInput
            label="Note"
            value={config.patient.notes}
            onChangeText={(text) => setConfig({
              ...config,
              patient: { ...config.patient, notes: text }
            })}
            disabled={!isEditing}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
        </Card.Content>
      </Card>

      {/* Configurazione Stanza Principale */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Stanza Principale</Title>
          <Divider style={styles.divider} />

          <View style={styles.deviceInfo}>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Nome stanza:</Paragraph>
              <Paragraph>{config.mainRoom.name}</Paragraph>
            </View>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>ID Dispositivo:</Paragraph>
              <Paragraph>{config.mainRoom.deviceId}</Paragraph>
            </View>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Stato:</Paragraph>
              <View style={styles.statusContainer}>
                <View 
                  style={[
                    styles.statusDot,
                    { backgroundColor: config.mainRoom.deviceStatus === 'Online' ? '#4CAF50' : '#F44336' }
                  ]} 
                />
                <Paragraph>{config.mainRoom.deviceStatus}</Paragraph>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Ultima manutenzione:</Paragraph>
              <Paragraph>{config.mainRoom.lastMaintenance}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Configurazione Bagno */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Bagno</Title>
          <Divider style={styles.divider} />

          <View style={styles.deviceInfo}>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Nome stanza:</Paragraph>
              <Paragraph>{config.bathroom.name}</Paragraph>
            </View>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>ID Dispositivo:</Paragraph>
              <Paragraph>{config.bathroom.deviceId}</Paragraph>
            </View>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Stato:</Paragraph>
              <View style={styles.statusContainer}>
                <View 
                  style={[
                    styles.statusDot,
                    { backgroundColor: config.bathroom.deviceStatus === 'Online' ? '#4CAF50' : '#F44336' }
                  ]} 
                />
                <Paragraph>{config.bathroom.deviceStatus}</Paragraph>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Ultima manutenzione:</Paragraph>
              <Paragraph>{config.bathroom.lastMaintenance}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Paragraph style={styles.note}>
        La configurazione dei dispositivi può essere modificata solo dal personale tecnico autorizzato.
        Per assistenza tecnica, contattare il supporto.
      </Paragraph>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  deviceInfo: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    color: '#666',
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  note: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: 32,
  },
});
