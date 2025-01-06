import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, Text } from 'react-native-paper';
import { useAuthContext } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      console.log('ProfileScreen - Attempting logout');
      await logout();
      console.log('ProfileScreen - Logout successful');
    } catch (error) {
      console.error('ProfileScreen - Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Profilo</Title>
      
      <View style={styles.userInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.button}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
  },
  button: {
    marginTop: 20,
  },
});
