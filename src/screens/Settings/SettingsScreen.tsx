import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, Switch, Divider, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoGenerateAlerts, setAutoGenerateAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Title style={styles.title}>Impostazioni</Title>

        {/* Notifiche */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Notifiche</Title>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons 
                  name="bell-outline" 
                  size={24} 
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Paragraph>Notifiche Push</Paragraph>
                  <Paragraph style={styles.description}>
                    Ricevi notifiche in tempo reale
                  </Paragraph>
                </View>
              </View>
              <Switch 
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color={colors.primary}
              />
            </View>

            <Divider style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons 
                  name="bell-ring-outline" 
                  size={24} 
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Paragraph>Suoni</Paragraph>
                  <Paragraph style={styles.description}>
                    Abilita suoni per le notifiche
                  </Paragraph>
                </View>
              </View>
              <Switch 
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                color={colors.primary}
              />
            </View>

            <Divider style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons 
                  name="sync" 
                  size={24} 
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Paragraph>Genera Notifiche</Paragraph>
                  <Paragraph style={styles.description}>
                    Genera notifiche di test automaticamente
                  </Paragraph>
                </View>
              </View>
              <Switch 
                value={autoGenerateAlerts}
                onValueChange={setAutoGenerateAlerts}
                color={colors.primary}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Aspetto */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Aspetto</Title>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons 
                  name="theme-light-dark" 
                  size={24} 
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Paragraph>Tema Scuro</Paragraph>
                  <Paragraph style={styles.description}>
                    Attiva il tema scuro dell'app
                  </Paragraph>
                </View>
              </View>
              <Switch 
                value={darkMode}
                onValueChange={setDarkMode}
                color={colors.primary}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Account */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Account</Title>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons 
                  name="account-outline" 
                  size={24} 
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Paragraph>Mario Rossi</Paragraph>
                  <Paragraph style={styles.description}>
                    mario.rossi@example.com
                  </Paragraph>
                </View>
              </View>
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color={colors.text.secondary}
              />
            </View>

            <Divider style={styles.divider} />

            <Button 
              mode="outlined" 
              onPress={() => {}} 
              textColor={colors.error}
              style={styles.logoutButton}
            >
              Disconnetti
            </Button>
          </Card.Content>
        </Card>

        {/* Info App */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Informazioni</Title>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons 
                  name="information-outline" 
                  size={24} 
                  color={colors.primary}
                />
                <View style={styles.settingText}>
                  <Paragraph>Versione</Paragraph>
                  <Paragraph style={styles.description}>1.0.0</Paragraph>
                </View>
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
    fontSize: 28,
    marginBottom: 16,
    color: colors.text.primary,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: colors.text.primary,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  description: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  divider: {
    marginVertical: 8,
  },
  logoutButton: {
    marginTop: 8,
    borderColor: colors.error,
  },
});
