import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AlertsStackParamList } from '../../../App';

type AlertDetailRouteProp = RouteProp<AlertsStackParamList, 'AlertDetail'>;

export default function AlertDetailScreen() {
  const route = useRoute<AlertDetailRouteProp>();
  const { alertId } = route.params;

  // In un'app reale, qui recupereresti i dettagli dell'alert dal backend
  const alertDetails = {
    id: alertId,
    title: `Notifica #${alertId}`,
    description: 'Dettagli della notifica...',
    timestamp: new Date().toLocaleString(),
    status: 'Non letta',
    priority: 'Alta',
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{alertDetails.title}</Title>
          <Paragraph style={styles.timestamp}>{alertDetails.timestamp}</Paragraph>
          <Paragraph style={styles.description}>{alertDetails.description}</Paragraph>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Paragraph style={styles.label}>Stato:</Paragraph>
              <Paragraph>{alertDetails.status}</Paragraph>
            </View>
            
            <View style={styles.infoItem}>
              <Paragraph style={styles.label}>Priorità:</Paragraph>
              <Paragraph>{alertDetails.priority}</Paragraph>
            </View>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => console.log('Segna come letta')}>
            Segna come letta
          </Button>
          <Button onPress={() => console.log('Elimina notifica')}>
            Elimina
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  infoContainer: {
    marginTop: 16,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
});
