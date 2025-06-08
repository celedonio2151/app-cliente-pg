import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Divider, List, Text} from 'react-native-paper';
import {formatDate} from '../../../helpers/formatDate';
import {User} from '../interfaces/user.interface';
import {useThemeContext} from '../../../context/ThemeContext';
import {ThemeColors} from '../../../themes/theme';

type Props = {
  user: User;
};

export default function UserDetails({user}: Props) {
  const {
    theme: {colors},
  } = useThemeContext();
  const stylesC = styleCustom(colors);
  return (
    <View style={stylesC.userInfoContainer}>
      <View style={stylesC.userNameRole}>
        <Text style={stylesC.userName}>{`${user.name} ${user.surname}`}</Text>
        <Text style={stylesC.userRole}>{user.roles.map(rol => rol.name)}</Text>
      </View>
      <List.Section>
        {/* <List.Subheader>Some title</List.Subheader> */}
        <List.Item
          title={`CI: ${user.ci}`}
          left={() => <List.Icon icon="smart-card" />}
        />
        <Divider />
        {user?.phoneNumber && (
          <List.Item
            title={`Cel: ${user.phoneNumber}`}
            left={() => <List.Icon color={''} icon="phone" />}
          />
        )}
        <Divider />
        {user?.email && (
          <>
            <List.Item
              title={`Email: ${user.email}`}
              left={() => <List.Icon color={''} icon="email" />}
            />
            <Divider />
          </>
        )}
        {user?.birthDate && (
          <>
            <List.Item
              title={formatDate(user?.birthDate, 'dddd DD MMM YYYY')}
              left={() => <List.Icon color={''} icon="calendar" />}
            />
            <Divider />
          </>
        )}
        <List.Item
          title={`Estado del medidor`}
          left={() => (
            <List.Icon color={'green'} icon={user.status ? 'check' : 'close'} />
          )}
        />
        <Divider />
      </List.Section>
      <Divider />
      <View style={stylesC.userInfoParent}>
        <Text style={stylesC.userInfo}>Estado:</Text>
        <Text style={stylesC.userInfo}>
          {user.status ? statusBox('green') : statusBox('red')}
        </Text>
      </View>
      <View style={stylesC.userInfoParent}>
        <Text style={stylesC.userInfo}>Sessiones activas: {22}</Text>
        <Text style={stylesC.userInfo}>
          {user.status ? statusBox('green') : statusBox('red')}
        </Text>
      </View>
      <Divider />
    </View>
  );
}

function styleCustom(colors: ThemeColors) {
  return StyleSheet.create({
    imgProfileContainer: {
      top: -60,
      alignSelf: 'center',
      width: 'auto',
      backgroundColor: colors.onBackground,
      borderRadius: 50,
      padding: 1,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    userInfoContainer: {
      width: '100%',
      padding: 20,
      // paddingTop: 80,
      // backgroundColor: 'orange',
      color: 'black',
      borderRadius: 10,
      // top: -100,
    },
    userNameRole: {paddingBottom: 20},
    userName: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black',
    },
    userRole: {fontSize: 18, color: colors.onBackground},
    userInfoParent: {
      // flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    userInfo: {
      fontSize: 16,
      marginBottom: 5,
      color: 'black',
    },
    containerLogout: {
      width: '100%',
    },
    logoutButton: {
      // position: 'absolute',
      padding: 5,
      width: '100%',
      backgroundColor: '#FF0000',
      borderRadius: 10,
    },
  });
}

function statusBox(color: string) {
  return (
    <View
      style={{
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: color,
      }}></View>
  );
}
