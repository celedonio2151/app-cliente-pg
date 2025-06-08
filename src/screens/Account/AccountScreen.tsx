import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';
import LayoutContainer from '../../layouts/LayoutContainer';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {useAuthContext} from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import {User} from './interfaces/user.interface';
import MaterialIcon from '../../components/MaterialIcon/MaterialIcon';
import UserDetails from './components/UserDetails';


export default function AccountScreen({
  profilePicture = 'https://source.unsplash.com/random/800x600/?river,park',
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const {accessToken, logout} = useAuthContext();
  const [eventTrigger, setEventTrigger] = useState<Date>(new Date());
  const [formEdit, setFormEdit] = useState<boolean>(false); // Show or hidden from
  // const {
  //   data: user,
  //   error,
  //   loading,
  //   handleCancelRequest,
  // } = useFetch<User>({
  //   endpoint: `/user/me`,
  //   token: accessToken,
  // });
  const data = {
    createdAt: '2025-05-15T00:27:01.550Z',
    updatedAt: '2025-05-15T05:36:34.000Z',
    deletedAt: null,
    _id: 'eea0345a-f75f-4637-969d-56ef0b7cfe72',
    ci: 77777711,
    name: 'Noelia',
    surname: 'Guzman Lenis',
    email: 'noelia@gmail.com',
    emailVerified: false,
    phoneNumber: null,
    phoneVerified: false,
    birthDate: null,
    profileImg: 'http://127.0.0.1:3050/profileImgs/1747268821419-29242-mac.jpg',
    status: true,
    authProvider: 'LOCAL',
    roles: [
      {
        createdAt: '2025-05-14T21:02:48.793Z',
        updatedAt: '2025-05-14T21:02:48.793Z',
        deletedAt: null,
        _id: '65a8db00-34b1-47dd-b40c-e656beef8f42',
        name: 'ADMIN',
        description: 'Administrador prinipal con todos los controles',
        status: true,
      },
    ],
  };

  const onRefresh = () => {
    console.log('Refresing...', loading);
    setEventTrigger(new Date());

    setTimeout(() => {}, 3000);
    loading ? setIsRefreshing(true) : setIsRefreshing(false);
  };

  // Función de ejemplo para manejar el cierre de sesión (reemplazar con tu lógica)
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    logout(); // Cierra session y borra el token
  };
  const LeftContent = (props: any) => <Avatar.Icon {...props} icon="account" />;

  return (
    <ScrollViewContainer isRefreshing={isRefreshing} onRefresh={onRefresh}>
      <LayoutContainer style={styles.container}>
        {/* Imagen de perfil */}
        <Card mode="elevated" style={styles.firstCardContainer}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={
                // uri: 'https://source.unsplash.com/collection/240395/800x600',
                require('../../assets/logoAgua.png')
              } // URL del logo (reemplazar)
              style={styles.logoImage}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.firstCardText}>
              Comite de Agua Potable Mosoj Llajta
            </Text>
          </View>
        </Card>

        {/* Información del usuario */}
        <Card mode="elevated" style={styles.secondCardContainer}>
          <Card
            mode="elevated"
            elevation={3}
            style={styles.imgProfileContainer}>
            {data && data.profileImg ? (
              <Image
                source={{
                  uri: data.profileImg,
                }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={{
                  uri: profilePicture,
                }}
                style={styles.profileImage}
              />
            )}
          </Card>
          <View
            style={{
              width: '100%',
              // backgroundColor: 'red',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: -50,
              // alignContent: 'flex-end',
            }}>
            {formEdit ? (
              <Button onPress={() => setFormEdit(false)}>
                <MaterialIcon name={'close'} size={25} color="red" />
              </Button>
            ) : (
              <Button onPress={() => setFormEdit(true)}>
                <MaterialIcon name={'pen'} size={25} color="gray" />
              </Button>
            )}
          </View>
          <UserDetails user={data} />
          {/* {!formEdit ? (
            data ? (
              <UserDetails userDetails={data} />
            ) : (
              <LoadingActivity title="Cargando mis datos personales ..." />
            )
          ) : null}
          {formEdit && <EditMeForm setFormEdit={setFormEdit} />} */}
        </Card>

        {/* Botones */}
        {!formEdit && (
          <Card style={styles.containerLogout}>
            <Button
              mode="elevated"
              textColor="white"
              style={styles.logoutButton}
              onPress={() => handleLogout()}>
              Cerrar Sesión
            </Button>
          </Card>
        )}
      </LayoutContainer>
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  firstCardContainer: {
    width: '100%',
    // minHeight: 250,
    height: 'auto',
    paddingVertical: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: 'center',
  },
  firstCardText: {
    fontSize: 30,
    textAlign: 'center',
    maxWidth: '90%',
    fontWeight: 'bold',
    color: '#0163d2',
  },
  secondCardContainer: {
    // position: 'relative',
    // flexDirection: 'row',
    width: '100%',
    height: 'auto',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  imgProfileContainer: {
    top: -60,
    alignSelf: 'center',
    width: 'auto',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  containerLogout: {
    width: '100%',
    height: 'auto',
    marginTop: 10,
    // marginBottom: 10,
  },
  logoutButton: {
    padding: 5,
    width: '100%',
    backgroundColor: '#FF0000',
    borderRadius: 10,
  },
});
