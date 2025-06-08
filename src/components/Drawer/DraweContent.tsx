import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Linking, Platform, StyleSheet, View} from 'react-native';
import {Avatar, Drawer, Switch, Text} from 'react-native-paper';

import {useAuthContext} from '../../context/AuthContext';
import {useThemeContext} from '../../context/ThemeContext';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import Developed from '../Footer/Developed';
import {formatDate} from '../../helpers/formatDate';
import {DRAWER_NAMES, STACK_NAMES, TAB_NAMES} from '../../configs/screenNames';
import {ThemeColors} from '../../themes/theme';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const {userProfile, logout} = useAuthContext();
  const {
    toggleTheme,
    isDarkTheme,
    theme: {colors},
  } = useThemeContext();

  const handleOnLogout = () => {
    console.log('Hanlder Logout');
    logout();
  };

  const styles = themeStyles(colors as ThemeColors);

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.container}
      {...props}>
      {/* <Drawer.Section>
        <DrawerItemList {...props} />
      </Drawer.Section> */}
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View style={styles.userInfoSection}>
          {userProfile?.profileImg && (
            <Avatar.Image
              // source={{
              //   uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
              // }}
              source={{uri: userProfile?.profileImg}}
              size={50}
            />
          )}
          <Text variant="titleLarge" style={styles.title}>
            {`${userProfile?.name}  ${userProfile?.surname}`}
          </Text>
          <Text variant="bodySmall" style={styles.caption}>
            {userProfile?.roles.map(rol => rol.name).join(', ')}
          </Text>
        </View>

        <Drawer.Section>
          <DrawerItem
            label="Help"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          {/* Theme Toggle */}
          <View style={styles.themeToggleContainer}>
            <Text>
              {isDarkTheme ? 'Desactivar tema oscuro' : 'Activar tema oscuro'}
            </Text>
            <Switch
              value={isDarkTheme}
              onValueChange={toggleTheme}
              trackColor={{false: '#d1d1d6', true: '#34C759'}} // Gris iOS / verde iOS
              thumbColor={
                Platform.OS === 'android'
                  ? isDarkTheme
                    ? '#ffffff'
                    : '#ffffff'
                  : undefined
              }
              ios_backgroundColor="#d1d1d6" // para iOS fallback
              style={styles.switch}
            />
          </View>
          <DrawerItem
            icon={({color, size}) => (
              <MaterialIcon name="account-outline" color={color} size={size} />
            )}
            label="Perfil"
            style={styles.items}
            onPress={() =>
              props.navigation.navigate(DRAWER_NAMES.HOME.path, {
                screen: TAB_NAMES.ACCOUNT.path,
                params: {screen: STACK_NAMES.ACCOUNT.path},
              })
            }
          />
          {!userProfile?.roles.some(rol => rol.name === 'LECTURADOR') && (
            <DrawerItem
              icon={({color, size}) => (
                <MaterialIcon name="speedometer" color={color} size={size} />
              )}
              label={`Lecturar ${formatDate(new Date(), 'MMMM YYYY')}`}
              style={styles.items}
              onPress={() =>
                props.navigation.navigate(DRAWER_NAMES.METERS.path, {
                  screen: STACK_NAMES.METERS.path,
                })
              }
            />
          )}
        </Drawer.Section>

        {/* Seccion Logout */}
        <Drawer.Section>
          <DrawerItem
            style={styles.buttonClose}
            icon={({color, size}) => (
              <MaterialIcon name="logout" color={color} size={size} />
            )}
            label={LogoutLabel}
            onPress={handleOnLogout}
          />
          <Developed />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const LogoutLabel = () => (
  <View style={{flex: 1, alignItems: 'center'}}>
    <Text>Cerrar sesión</Text>
  </View>
);

const themeStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      // padding: 5,
      backgroundColor: colors.background,
      flex: 1,
    },
    title: {
      marginTop: 20,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    items: {
      marginVertical: 2,
      color: 'red',
      backgroundColor: colors.surface,
    },
    themeToggleContainer: {
      marginBottom: 20,
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    switch: {
      transform: [{scaleX: 1.2}, {scaleY: 1.2}], // levemente más grande
      marginVertical: 10,
    },
    buttonClose: {
      borderRadius: 10,
      backgroundColor: 'red',
    },
  });
};
