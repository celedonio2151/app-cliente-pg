import {BottomNavigation} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TAB_NAMES} from '../../configs/screenNames';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import {
  AccountStack,
  ChartsStack,
  HistoryStack,
  HomeStack,
} from '../Stack/StackNavigator';
import {CommonActions} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={TAB_NAMES.HOME.path}
      screenOptions={{
        animation: 'fade',
        headerShown: false,
      }}
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          activeColor="green"
          inactiveColor="silver"
          style={{height: '7.5%'}}
          theme={{
            fonts: {labelMedium: {fontSize: 11, fontWeight: 'bold'}},
          }}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) =>
            descriptors[route.key].options.tabBarIcon?.({
              focused,
              color,
              size: 24,
            }) || null
          }
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : typeof options.title === 'string'
                ? options.title
                : route.name;

            return label;
          }}
          // shifting={true}
        />
      )}>
      <Tab.Screen
        name={TAB_NAMES.HOME.path}
        component={HomeStack}
        options={{
          tabBarLabel: `${TAB_NAMES.HOME.label}`,
          tabBarIcon: ({color, size = 22}) => (
            <MaterialIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={TAB_NAMES.HISTORY.path}
        component={HistoryStack}
        options={{
          tabBarLabel: `${TAB_NAMES.HISTORY.label}`,
          tabBarIcon: ({color, size = 22}) => (
            <MaterialIcon name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={TAB_NAMES.CHARTS.path}
        component={ChartsStack}
        options={{
          tabBarLabel: `${TAB_NAMES.CHARTS.label}`,
          tabBarIcon: ({color, size = 22}) => (
            <MaterialIcon name="chart-areaspline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={TAB_NAMES.ACCOUNT.path}
        component={AccountStack}
        options={{
          tabBarLabel: `${TAB_NAMES.ACCOUNT.label}`,
          tabBarIcon: ({color, size = 22}) => (
            <MaterialIcon name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
