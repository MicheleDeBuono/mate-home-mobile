import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function BathroomDetailScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Title style={styles.title}>Stato Attuale</Title>
        
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.statusContainer}>
              <View style={styles.statusItem}>
                <MaterialCommunityIcons 
                  name="account-off" 
                  size={32} 
                  color={colors.absence}
                />
                <Paragraph>Non Occupato</Paragraph>
              </View>

              <View style={styles.statusItem}>
                <MaterialCommunityIcons 
                  name="clock-outline" 
                  size={32} 
                  color={colors.info}
                />
                <Paragraph>15m fa</Paragraph>
              </View>

              <View style={styles.statusItem}>
                <MaterialCommunityIcons 
                  name="timer-outline" 
                  size={32} 
                  color={colors.info}
                />
                <Paragraph>5m durata</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Title style={styles.sectionTitle}>Attività Recente</Title>
        
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.activityItem}>
              <MaterialCommunityIcons 
                name="door" 
                size={24} 
                color={colors.info}
              />
              <View style={styles.activityText}>
                <Paragraph>Uscita dal bagno</Paragraph>
                <Paragraph style={styles.timestamp}>15 minuti fa</Paragraph>
              </View>
            </View>

            <View style={styles.activityItem}>
              <MaterialCommunityIcons 
                name="door" 
                size={24} 
                color={colors.info}
              />
              <View style={styles.activityText}>
                <Paragraph>Entrata nel bagno</Paragraph>
                <Paragraph style={styles.timestamp}>20 minuti fa</Paragraph>
              </View>
            </View>

            <View style={styles.activityItem}>
              <MaterialCommunityIcons 
                name="door" 
                size={24} 
                color={colors.info}
              />
              <View style={styles.activityText}>
                <Paragraph>Uscita dal bagno</Paragraph>
                <Paragraph style={styles.timestamp}>2 ore fa</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Title style={styles.sectionTitle}>Parametri Ambientali</Title>
        
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.environmentItem}>
              <MaterialCommunityIcons 
                name="thermometer" 
                size={24} 
                color={colors.info}
              />
              <View style={styles.environmentText}>
                <Paragraph>Temperatura</Paragraph>
                <Paragraph style={styles.value}>24°C</Paragraph>
              </View>
            </View>

            <View style={styles.environmentItem}>
              <MaterialCommunityIcons 
                name="water-percent" 
                size={24} 
                color={colors.info}
              />
              <View style={styles.environmentText}>
                <Paragraph>Umidità</Paragraph>
                <Paragraph style={styles.value}>60%</Paragraph>
              </View>
            </View>

            <View style={styles.environmentItem}>
              <MaterialCommunityIcons 
                name="lightbulb-on" 
                size={24} 
                color={colors.info}
              />
              <View style={styles.environmentText}>
                <Paragraph>Luci</Paragraph>
                <Paragraph style={styles.value}>Spente</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Title style={styles.sectionTitle}>Statistiche Giornaliere</Title>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.statsItem}>
              <MaterialCommunityIcons 
                name="counter" 
                size={24} 
                color={colors.info}
              />
              <View style={styles.statsText}>
                <Paragraph>Numero di visite</Paragraph>
                <Paragraph style={styles.value}>8</Paragraph>
              </View>
            </View>

            <View style={styles.statsItem}>
              <MaterialCommunityIcons 
                name="clock-time-eight-outline" 
                size={24} 
                color={colors.info}
              />
              <View style={styles.statsText}>
                <Paragraph>Tempo medio</Paragraph>
                <Paragraph style={styles.value}>6 minuti</Paragraph>
              </View>
            </View>

            <View style={styles.statsItem}>
              <MaterialCommunityIcons 
                name="clock-alert-outline" 
                size={24} 
                color={colors.warning}
              />
              <View style={styles.statsText}>
                <Paragraph>Visita più lunga</Paragraph>
                <Paragraph style={styles.value}>15 minuti</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: colors.text.primary,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 16,
    color: colors.text.primary,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: colors.surface,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusItem: {
    alignItems: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityText: {
    marginLeft: 16,
    flex: 1,
  },
  timestamp: {
    color: colors.text.secondary,
    fontSize: 12,
  },
  environmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  environmentText: {
    marginLeft: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsText: {
    marginLeft: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontWeight: 'bold',
    color: colors.text.primary,
  },
});
