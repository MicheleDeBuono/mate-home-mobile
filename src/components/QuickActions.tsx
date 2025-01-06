import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface QuickActionsProps {
  onEmergency?: () => void;
  onCall?: () => void;
  onLocation?: () => void;
}

const QuickActions = ({ onEmergency, onCall, onLocation }: QuickActionsProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        buttonColor={theme.colors.error}
        icon={({ size, color }) => (
          <MaterialCommunityIcons name="alert" size={size} color={color} />
        )}
        onPress={onEmergency}
        style={styles.emergencyButton}
      >
        Emergenza
      </Button>

      <View style={styles.row}>
        <Button
          mode="outlined"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="phone" size={size} color={color} />
          )}
          onPress={onCall}
          style={styles.button}
        >
          Chiama
        </Button>

        <Button
          mode="outlined"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="map-marker" size={size} color={color} />
          )}
          onPress={onLocation}
          style={styles.button}
        >
          Posizione
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  emergencyButton: {
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default QuickActions;
