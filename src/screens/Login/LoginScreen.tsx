import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Card, Button, Text, TextInput, HelperText} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

import ScrollViewContainer from '../../layouts/ScrollViewContainer';
import LayoutContainer from '../../layouts/LayoutContainer';
import {useAuthContext} from '../../context/AuthContext';
import Developed from '../../components/Footer/Developed';
import MaterialIcon from '../../components/MaterialIcon/MaterialIcon';
import usePost from '../../hooks/usePost';
import {MyUser} from '../Account/interfaces/user.interface';
import {useThemeContext} from '../../context/ThemeContext';
import {ThemeColors} from '../../themes/theme';

type FormData = {
  ci: string;
};

export default function LoginScreen() {
  const {post, loading, error} = usePost<MyUser>();
  const {setAccessToken, setRefreshToken, setProfile} = useAuthContext();
  const {
    theme: {colors},
  } = useThemeContext();

  const [emergency] = useState({
    phone: '+59171169885',
    message: 'Emergencia por agua potable',
    url: `https://wa.me/${71169885}?text=Emergencia%20por%20agua%20potable`,
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormData>({
    defaultValues: {ci: ''},
  });

  const handleLogin = async (data: FormData) => {
    // await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    console.log('Enviando', data);
    const body = {ci: Number(data.ci)};
    console.log('🚀 ~ handleLogin ~ body:', body);
    try {
      const res = await post('auth/user/signin', body);
      if (res) {
        console.log('🚀 ~ handleLogin ~ res:', res);
        setAccessToken(res.myTokens.accessToken);
        setRefreshToken(res.myTokens.refreshToken);
        setProfile(res.user);
        await new Promise(resolve => {
          setTimeout(() => resolve(true), 2000); // Simular un retraso de 2 segundos
        });
        // Aquí podrías navegar a la pantalla principal o mostrar un mensaje de éxito
      }
    } catch (err) {
      // console.log('Ocurrio un error', error);
      if (error) {
        console.error('Error al iniciar sesión:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  };
  console.log(loading, error);
  const openWhatsApp = () => {
    Linking.openURL(emergency.url).catch(() =>
      console.error('No se pudo abrir WhatsApp'),
    );
  };

  const styles = stylesC(colors as ThemeColors);
  return (
    <LayoutContainer style={styles.container} noPadding>
      <ScrollViewContainer enableRefresh={false}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            paddingHorizontal: 12,
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
          // contentContainerStyle={{flexGrow: 1}}
        >
          {/* Imagen de portada */}
          <Card mode="elevated" elevation={5} style={styles.cardImage}>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          </Card>

          {/* Título */}
          <Card mode="contained" style={styles.titleCard}>
            <Card.Content>
              <Text style={styles.title}>
                Comité de Agua Potable Mosoj Llajta
              </Text>
            </Card.Content>
          </Card>

          {/* Formulario */}
          <Card mode="elevated" elevation={1} style={styles.form}>
            <Card style={styles.userIcon}>
              <MaterialIcon name="account" color="black" size={80} />
            </Card>
            <View style={styles.formAction}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    mode="outlined"
                    label="Carnet de identidad"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    outlineStyle={styles.outlineStyle}
                    right={<TextInput.Icon icon="card-account-details" />}
                    error={!!errors.ci}
                  />
                )}
                name="ci"
                rules={{
                  required: 'Carnet de identidad es requerido!',
                  minLength: {
                    value: 4,
                    message: 'Debe tener al menos 4 dígitos',
                  },
                  maxLength: {
                    value: 12,
                    message: 'No puede tener más de 12 dígitos',
                  },
                }}
              />
              {errors.ci && (
                <HelperText type="error">{errors.ci.message}</HelperText>
              )}
            </View>

            {/* Botón de inicio de sesión */}
            <View style={styles.formAction}>
              <Button
                mode="elevated"
                icon="login"
                buttonColor="#009A2B"
                textColor="white"
                style={styles.btn}
                onPress={handleSubmit(handleLogin)}
                loading={isSubmitting}
                disabled={isSubmitting}>
                {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
              </Button>
            </View>

            {/* Emergencias */}
            <Card.Content style={styles.footer}>
              <Text style={styles.textColor}>
                {emergency.message}:
                <TouchableOpacity
                  onPress={openWhatsApp}
                  style={{flexDirection: 'row', alignItems: 'baseline'}}>
                  <MaterialIcon name="whatsapp" size={28} color="#009A2B" />
                  <Text style={styles.textColor}>{emergency.phone}</Text>
                </TouchableOpacity>
              </Text>
            </Card.Content>
          </Card>
        </KeyboardAvoidingView>
        <Developed />
      </ScrollViewContainer>
    </LayoutContainer>
  );
}

const stylesC = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'space-around',
      flex: 1,
    },
    cardImage: {
      borderRadius: 10,
    },
    titleCard: {
      backgroundColor: 'transparent',
      marginVertical: 10,
      minHeight: 100,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    form: {
      marginVertical: 20,
      padding: 20,
      borderRadius: 10,
    },
    userIcon: {
      alignSelf: 'center',
      borderRadius: 50,
      padding: 10,
      marginBottom: 20,
    },
    formAction: {
      marginBottom: 20,
    },
    input: {
      borderRadius: 10,
    },
    outlineStyle: {
      borderRadius: 10,
    },
    btn: {
      paddingVertical: 5,
    },
    footer: {
      marginTop: 20,
    },
    textColor: {
      fontSize: 16,
    },
  });
