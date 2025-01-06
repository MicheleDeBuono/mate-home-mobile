import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph, IconButton, useTheme } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';

export default function BathroomDetailScreen() {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width - 32;

  // In un'app reale, questi dati verrebbero dal backend
  const currentStatus = {
    presence: false,
    lastVisit: '10:30',
    duration: '5 min',
    visitsToday: 6,
    averageVisitTime: '4.5 min',
  };

  // Dati di esempio per i grafici
  const weeklyVisits = {
    labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    datasets: [{
      data: [5, 8, 6, 10, 4, 7, 6], // visite per giorno
    }]
  };

  const visitDurations = {
    labels: ['1-3m', '3-5m', '5-7m', '7-10m', '>10m'],
    datasets: [{
      data: [10, 15, 8, 4, 2], // numero di visite per durata
    }]
  };

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Stato Attuale */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerContainer}>
            <Title>Stato Attuale</Title>
            <IconButton
              icon={currentStatus.presence ? 'account' : 'account-off'}
              size={24}
              iconColor={currentStatus.presence ? theme.colors.primary : theme.colors.error}
            />
          </View>

          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <IconButton icon="clock-outline" size={24} />
              <View>
                <Paragraph style={styles.label}>Ultima visita</Paragraph>
                <Paragraph>{currentStatus.lastVisit}</Paragraph>
                <Paragraph style={styles.subtext}>Durata: {currentStatus.duration}</Paragraph>
              </View>
            </View>

            <View style={styles.statusItem}>
              <IconButton icon="calendar" size={24} />
              <View>
                <Paragraph style={styles.label}>Visite oggi</Paragraph>
                <Paragraph>{currentStatus.visitsToday}</Paragraph>
                <Paragraph style={styles.subtext}>Media: {currentStatus.averageVisitTime}</Paragraph>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Grafici */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.chartTitle}>Visite Settimanali</Title>
          <Paragraph style={styles.chartSubtitle}>Numero di visite per giorno</Paragraph>
          <LineChart
            data={weeklyVisits}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.chartTitle}>Distribuzione Durata Visite</Title>
          <Paragraph style={styles.chartSubtitle}>Numero di visite per durata</Paragraph>
          <BarChart
            data={visitDurations}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </Card.Content>
      </Card>

      {/* Avvisi */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.chartTitle}>Suggerimenti</Title>
          <View style={styles.tipContainer}>
            <IconButton icon="information" size={24} color={theme.colors.primary} />
            <Paragraph style={styles.tip}>
              La durata media delle visite è nella norma. Non ci sono anomalie da segnalare.
            </Paragraph>
          </View>
        </Card.Content>
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
    elevation: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusGrid: {
    marginBottom: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: '#666',
    fontSize: 14,
  },
  subtext: {
    color: '#666',
    fontSize: 12,
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  chartSubtitle: {
    color: '#666',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tip: {
    flex: 1,
    marginLeft: 8,
  },
});
