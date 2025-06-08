/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import DrawerNavigator from './src/components/Drawer/MyDrawer';
import {useAuthContext} from './src/context/AuthContext';
import LoadingActivity from './src/components/LoadingActivity/LoadingActivity';
import LoginScreen from './src/screens/Login/LoginScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App(): React.JSX.Element {
  const {accessToken, loading} = useAuthContext();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {loading && <LoadingActivity />}
      {!loading && accessToken ? <DrawerNavigator /> : <LoginScreen />}
    </SafeAreaProvider>
  );
}
