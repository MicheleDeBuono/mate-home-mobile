import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface VitalsCardProps {
  heartRate?: number;
  steps?: number;
  location?: string;
  lastUpdate?: string;
  onPress?: () => void;
}

const VitalsCard = ({ heartRate, steps, location, lastUpdate, onPress }: VitalsCardProps) => {
  const theme = useTheme();

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>Stato Paziente</Text>
        
        <View style={styles.row}>
          <View style={styles.vitalItem}>
            <MaterialCommunityIcons name="heart-pulse" size={24} color={theme.colors.error} />
            <Text variant="bodyLarge">{heartRate || '--'} BPM</Text>
          </View>
          
          <View style={styles.vitalItem}>
            <MaterialCommunityIcons name="walk" size={24} color={theme.colors.primary} />
            <Text variant="bodyLarge">{steps || '0'} passi</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <MaterialCommunityIcons name="map-marker" size={20} color={theme.colors.secondary} />
          <Text variant="bodyMedium" numberOfLines={1} style={styles.location}>
            {location || 'Posizione non disponibile'}
          </Text>
        </View>

        {lastUpdate && (
          <Text variant="bodySmall" style={styles.timestamp}>
            Ultimo aggiornamento: {lastUpdate}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  title: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  vitalItem: {
    alignItems: 'center',
    gap: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    marginLeft: 8,
    flex: 1,
  },
  timestamp: {
    textAlign: 'right',
    opacity: 0.7,
  },
});

export default VitalsCard;
