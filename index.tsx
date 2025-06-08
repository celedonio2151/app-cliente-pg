/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import {ThemeProvider} from './src/context/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';

export default function Main() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
