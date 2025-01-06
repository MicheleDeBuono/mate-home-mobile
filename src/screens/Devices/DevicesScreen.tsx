import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function DevicesScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  // In un'app reale, questi dati verrebbero dal backend
  const devices = [
    {
      id: '1',
      name: 'Radar Stanza Principale',
      type: 'Radar',
      location: 'Stanza Principale',
      status: 'Online',
      lastUpdate: '2 minuti fa',
    },
    {
      id: '2',
      name: 'Radar Bagno',
      type: 'Radar',
      location: 'Bagno',
      status: 'Online',
      lastUpdate: '5 minuti fa',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Dispositivi Installati</Title>

      {devices.map(device => (
        <Card key={device.id} style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <View>
                <Title>{device.name}</Title>
                <Paragraph style={styles.location}>{device.location}</Paragraph>
              </View>
              <IconButton
                icon={device.status === 'Online' ? 'wifi' : 'wifi-off'}
                size={24}
                iconColor={device.status === 'Online' ? theme.colors.primary : theme.colors.error}
              />
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <IconButton icon="radar" size={24} />
                <Paragraph>Tipo: {device.type}</Paragraph>
              </View>
              <View style={styles.infoRow}>
                <IconButton icon="clock-outline" size={24} />
                <Paragraph>Ultimo aggiornamento: {device.lastUpdate}</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}

      <Paragraph style={styles.note}>
        I dispositivi possono essere configurati solo dal personale tecnico autorizzato.
        Per assistenza, contattare il supporto.
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  location: {
    color: '#666',
  },
  infoContainer: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  note: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 32,
  },
});
