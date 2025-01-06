import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

interface AlertsChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
    }[];
  };
}

const AlertsChart: React.FC<AlertsChartProps> = ({ data }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Avvisi negli ultimi 7 giorni</Title>
        <View style={styles.chartContainer}>
          <LineChart
            data={data}
            width={Dimensions.get('window').width - 64}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default AlertsChart;
