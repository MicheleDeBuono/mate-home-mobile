# MATE HOME Mobile App

React Native mobile application for the MATE HOME system, providing a mobile interface for monitoring IoT devices and activity data.

## Features

- Real-time device monitoring
- Push notifications for important events
- Historical data visualization with interactive charts
- Device management
- User authentication
- Offline support

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio and Android SDK (for Android development)
- MATE HOME Backend running

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd mate-home-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
API_URL=http://localhost:3000
WS_URL=ws://localhost:3000
```

4. Start the development server:
```bash
npm start
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Start iOS simulator
- `npm run android` - Start Android simulator
- `npm run web` - Start web version

## Project Structure

```
src/
├── components/
│   ├── ActivityChart/
│   └── DeviceCard/
├── screens/
│   ├── HomeScreen/
│   └── RoomScreen/
├── services/
├── hooks/
├── types/
└── utils/
```

## Configuration

### Environment Variables

- `API_URL`: Backend API URL
- `WS_URL`: WebSocket server URL

### API Integration

The mobile app communicates with the backend through:
1. REST API calls for data fetching and device management
2. WebSocket connection for real-time updates

## Features Documentation

### Device Monitoring
- Real-time activity status
- Historical data visualization
- Device configuration

### Charts and Graphs
- Activity timeline with zoom support
- Breath rate monitoring
- Custom date range selection

### Mobile-Specific Features
- Push notifications
- Background data sync
- Offline mode
- Native device integration

## Building for Production

### iOS
1. Configure app.json for iOS:
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.matehome"
    }
  }
}
```

2. Build iOS bundle:
```bash
expo build:ios
```

### Android
1. Configure app.json for Android:
```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.matehome"
    }
  }
}
```

2. Build Android bundle:
```bash
expo build:android
```

## Integration with Backend

1. Ensure the backend is running and accessible
2. Configure the correct API URL in `.env`
3. Test the WebSocket connection
4. Configure push notifications

## Device Support

- iOS 13 or later
- Android 6.0 or later

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Troubleshooting

### Common Issues

1. Metro bundler issues:
```bash
npm start -- --reset-cache
```

2. Pod installation issues (iOS):
```bash
cd ios && pod install
```

3. Android build issues:
```bash
cd android && ./gradlew clean
```

## License

[Your chosen license]
