import {createDrawerNavigator} from '@react-navigation/drawer';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

import CustomDrawerContent from './DraweContent';
import BottomTabNavigator from '../BottomBavigator/BottomNavigator';
import {MetersStack} from '../Stack/StackNavigator';
import {DRAWER_NAMES} from '../../configs/screenNames';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName={DRAWER_NAMES.HOME.path}
      screenOptions={{
        title: `${DRAWER_NAMES.HOME.label}`,
        // headerStyle: {backgroundColor: colors.primary},
        headerShown: false,
        // headerTintColor: colors.onPrimary,
        headerTitleAlign: 'center',
      }}
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name={DRAWER_NAMES.HOME.path}
        options={{
          title: 'Home',
        }}
        component={BottomTabNavigator}
      />
      <Drawer.Screen
        name="DrawerScreen2"
        options={{
          title: 'Drawer Screen 2',
        }}
        component={TestScreen}
      />
      <Drawer.Screen
        name={DRAWER_NAMES.METERS.path}
        options={{
          title: 'Medidores',
        }}
        component={MetersStack}
      />
    </Drawer.Navigator>
  );
}

function TestScreen() {
  return (
    <View>
      <Text>Pagina de testing</Text>
    </View>
  );
}
