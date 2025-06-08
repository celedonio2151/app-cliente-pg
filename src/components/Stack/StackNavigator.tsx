// App.tsx
import React from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';

import {STACK_NAMES} from '../../configs/screenNames';
// import {stackStyles} from './headerStyles';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import HistoryScreen from '../../screens/History/HistoryScreen';
import AccountScreen from '../../screens/Account/AccountScreen';
import ChartsScreen from '../../screens/Charts/ChartsScreen';
import HomeScreen from '../../screens/Home/HomeScreen';
import MetersScreen from '../../screens/Meters/MetersScreen';
import ReadingFormScreen from '../../screens/readingForm/ReadingForm';
import {useThemeContext} from '../../context/ThemeContext';

const Stack = createNativeStackNavigator();

// Stack para Home
export function HomeStack() {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useThemeContext();
  const navigate = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <Stack.Navigator
      initialRouteName={STACK_NAMES.HOME.path}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.onPrimary,
        headerTitleAlign: 'center',
        headerShown: true,
      }}>
      <Stack.Screen
        name={STACK_NAMES.HOME.path}
        component={HomeScreen}
        options={{
          title: `${STACK_NAMES.HOME.label}`,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <MaterialIcon
                  name="menu"
                  color="white"
                  size={26}
                  onPress={navigate}
                />
              </View>
            );
          },
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// Stack para Profile
export function AccountStack() {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useThemeContext();
  const navigate = () => navigation.dispatch(DrawerActions.openDrawer());
  return (
    <Stack.Navigator
      initialRouteName={STACK_NAMES.ACCOUNT.path}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.onPrimary,
        headerTitleAlign: 'center',
        headerShown: true,
      }}>
      <Stack.Screen
        name={`${STACK_NAMES.ACCOUNT.path}`}
        component={AccountScreen}
        options={{
          title: `${STACK_NAMES.ACCOUNT.label}`,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <MaterialIcon
                  name="menu"
                  color="white"
                  size={26}
                  onPress={navigate}
                />
              </View>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Stack para History
export function HistoryStack() {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useThemeContext();
  const navigate = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <Stack.Navigator
      initialRouteName={STACK_NAMES.HISTORY.path}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.onPrimary,
        headerTitleAlign: 'center',
        headerShown: true,
      }}>
      <Stack.Screen
        name={STACK_NAMES.HISTORY.path}
        component={HistoryScreen}
        options={{
          title: `${STACK_NAMES.HISTORY.label}`,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <MaterialIcon
                  name="menu"
                  color="white"
                  size={26}
                  onPress={navigate}
                />
              </View>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Stack para Graficos
export function ChartsStack() {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useThemeContext();
  const navigate = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <Stack.Navigator
      initialRouteName={STACK_NAMES.CHARTS.path}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.onPrimary,
        headerTitleAlign: 'center',
        headerShown: true,
      }}>
      <Stack.Screen
        name={STACK_NAMES.CHARTS.path}
        component={ChartsScreen}
        options={{
          title: `${STACK_NAMES.CHARTS.label}`,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <MaterialIcon
                  name="menu"
                  color="white"
                  size={26}
                  onPress={navigate}
                />
              </View>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Stack para Medidores
export function MetersStack() {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useThemeContext();
  const navigate = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <Stack.Navigator
      initialRouteName={STACK_NAMES.METERS.path}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.onPrimary,
        headerTitleAlign: 'center',
        headerShown: true,
      }}>
      <Stack.Screen
        name={STACK_NAMES.METERS.path}
        component={MetersScreen}
        options={{
          title: `${STACK_NAMES.METERS.label}`,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <MaterialIcon
                  name="menu"
                  color="white"
                  size={26}
                  onPress={navigate}
                />
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name={STACK_NAMES.FORM_METER.path}
        component={ReadingFormScreen}
        options={{title: 'Lecturando medidor'}}
      />
    </Stack.Navigator>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button mode="elevated" onPress={() => navigation.goBack()}>
        Go Back
      </Button>
    </View>
  );
}
function SettingsScreen({navigation}) {
  return (
    <View>
      <Text>Settings Screen</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Notifications')}>
        Notification Settings
      </Button>
    </View>
  );
}
function NotificationSettingsScreen({navigation}) {
  return (
    <View>
      <Text>Notification Settings Screen</Text>
      <Button mode="contained" onPress={() => navigation.goBack()}>
        Go Back
      </Button>
    </View>
  );
}
