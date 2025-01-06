import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Title, Paragraph } from 'react-native-paper';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface ActivityChartProps {
  data: {
    time: string;
    activitySeconds: number;
    breathSeconds: number;
    deviceId: string;
  }[];
  title?: string;
  loading?: boolean;
}

const screenWidth = Dimensions.get('window').width;

export default function ActivityChart({ data, title, loading }: ActivityChartProps) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Paragraph>Nessun dato disponibile</Paragraph>
      </View>
    );
  }

  // Transform and validate data
  const validData = data
    .map(item => ({
      ...item,
      activitySeconds: Number.isFinite(item.activitySeconds) ? item.activitySeconds : 0,
      breathSeconds: Number.isFinite(item.breathSeconds) ? item.breathSeconds : 0,
      timestamp: new Date(item.time).getTime()
    }))
    .filter(item => !isNaN(item.timestamp));

  if (validData.length === 0) {
    return (
      <View style={styles.container}>
        <Paragraph>Dati non validi</Paragraph>
      </View>
    );
  }

  // Calculate chart dimensions
  const horizontalPadding = 32;
  const chartWidth = screenWidth - (horizontalPadding * 2) - 32; // Sottraiamo il padding della card
  const chartHeight = Math.min(220, screenWidth * 0.5);

  // Configure chart appearance
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    fillShadowGradientFrom: '#ffffff',
    fillShadowGradientTo: '#ffffff',
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '2',
      strokeWidth: '0',
    },
    propsForBackgroundLines: {
      strokeDasharray: '4 4',
      strokeOpacity: 0.2,
    },
    propsForLabels: {
      fontSize: 10,
    },
  };

  // Prepare chart data
  const chartData = {
    labels: validData.map((d, i) => 
      i % Math.max(1, Math.floor(validData.length / 5)) === 0 
        ? format(new Date(d.time), 'HH:mm', { locale: it })
        : ''
    ),
    datasets: [
      {
        data: validData.map(d => Math.max(0, d.activitySeconds)),
        color: () => '#1976d2',
        strokeWidth: 2,
        withDots: false,
      },
      {
        data: validData.map(d => Math.max(0, d.breathSeconds)),
        color: () => '#dc004e',
        strokeWidth: 2,
        withDots: false,
      },
    ],
    legend: ['Attività', 'Respiro'],
  };

  return (
    <View style={styles.container}>
      {title && <Title>{title}</Title>}
      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          bezier
          withHorizontalLabels={true}
          withVerticalLabels={true}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={true}
          withHorizontalLines={true}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={5}
          formatYLabel={(value) => Math.round(parseFloat(value)).toString()}
          style={{
            marginVertical: 8,
            borderRadius: 8,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    overflow: 'hidden', // Assicura che il contenuto non sbordi
  },
  chartWrapper: {
    marginHorizontal: -16,
    alignItems: 'center', // Centra il grafico
  },
});
