import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';

interface DeviceStatusChartProps {
  data: {
    name: string;
    count: number;
    color: string;
  }[];
  total: number;
}

const DeviceStatusChart: React.FC<DeviceStatusChartProps> = ({ data, total }) => {
  const chartData = data.map(item => ({
    name: item.name,
    population: item.count,
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Stato dei dispositivi</Title>
        <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width - 64}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Totale dispositivi</Text>
          <Text style={styles.totalValue}>{total}</Text>
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
  totalContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 14,
    color: '#757575',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 4,
  },
});

export default DeviceStatusChart;
