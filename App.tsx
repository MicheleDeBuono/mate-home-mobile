import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { AuthProvider, useAuthContext } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/Auth/LoginScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import DevicesScreen from './src/screens/Devices/DevicesScreen';
import AlertsScreen from './src/screens/Alerts/AlertsScreen';
import AlertDetailScreen from './src/screens/Alerts/AlertDetailScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import RoomDetailScreen from './src/screens/Details/RoomDetailScreen';
import BathroomDetailScreen from './src/screens/Details/BathroomDetailScreen';
import ConfigScreen from './src/screens/Config/ConfigScreen';
import { generateDemoAlerts } from './src/services/demo-alerts.service';
import NotificationBadge from './src/components/NotificationBadge';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AlertsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

export type AlertsStackParamList = {
  AlertsList: undefined;
  AlertDetail: { alertId: string };
};

export type HomeStackParamList = {
  Home: undefined;
  RoomDetail: undefined;
  BathroomDetail: undefined;
  Config: undefined;
};

function AlertsStackNavigator() {
  return (
    <AlertsStack.Navigator>
      <AlertsStack.Screen 
        name="AlertsList" 
        component={AlertsScreen}
        options={{ headerShown: false }}
      />
      <AlertsStack.Screen 
        name="AlertDetail" 
        component={AlertDetailScreen}
        options={{ title: 'Dettaglio Notifica' }}
      />
    </AlertsStack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="HomeMain" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="RoomDetail" 
        component={RoomDetailScreen}
        options={{ title: 'Dettagli Stanza Principale' }}
      />
      <HomeStack.Screen 
        name="BathroomDetail" 
        component={BathroomDetailScreen}
        options={{ title: 'Dettagli Bagno' }}
      />
      <HomeStack.Screen 
        name="Config" 
        component={ConfigScreen}
        options={{ title: 'Configurazione' }}
      />
    </HomeStack.Navigator>
  );
}

function MainTabs() {
  console.log('Rendering MainTabs');
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Devices':
              iconName = focused ? 'hardware-chip' : 'hardware-chip-outline';
              break;
            case 'Alerts':
              return (
                <View style={{ width: 24, height: 24 }}>
                  <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={size} color={color} />
                  <NotificationBadge />
                </View>
              );
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Tab.Screen 
        name="Devices" 
        component={DevicesScreen} 
        options={{ title: 'Dispositivi' }}
      />
      <Tab.Screen 
        name="Alerts" 
        component={AlertsStackNavigator}
        options={{ headerShown: false, title: 'Notifiche' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profilo' }}
      />
    </Tab.Navigator>
  );
}

function NavigationRoot() {
  const { isAuthenticated, isLoading } = useAuthContext();
  
  useEffect(() => {
    const initializeAlerts = async () => {
      if (isAuthenticated) {
        console.log('Generating demo alerts...');
        try {
          await generateDemoAlerts();
          console.log('Demo alerts generated successfully');
        } catch (error) {
          console.error('Error generating demo alerts:', error);
        }
      }
    };

    initializeAlerts();
  }, [isAuthenticated]);

  console.log('RootNavigator - Auth State:', { isAuthenticated, isLoading });

  if (isLoading) {
    console.log('RootNavigator - Showing loading screen');
    return <LoadingScreen />;
  }

  console.log('RootNavigator - Rendering stack navigator');
  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <>
          {console.log('RootNavigator - Rendering auth screens')}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          {console.log('RootNavigator - Rendering main app')}
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  console.log('Rendering App');
  return (
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer>
          <NavigationRoot />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
