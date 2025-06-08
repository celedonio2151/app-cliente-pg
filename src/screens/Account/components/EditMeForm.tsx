import {View, Text, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {DatePickerInput, DatePickerModal} from 'react-native-paper-dates';
import {Controller, useForm} from 'react-hook-form';

import useFetch from '../../../hooks/useFetch';
import {
  Button,
  Card,
  HelperText,
  Portal,
  Snackbar,
  TextInput,
} from 'react-native-paper';
import LoadingActivity from '../../../components/LoadingActivity/LoadingActivity';
import {useAuthContext} from '../../../context/AuthContext';
import {User} from '../interfaces/user.interface';
import { config } from '../../../configs/config';

interface BodyData {
  email: string;
  phone_number: string;
  birthdate: string;
  profileImg: string;
}

export default function EditMeForm({setFormEdit}): React.JSX.Element {
  const {accessToken} = useAuthContext();
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inputDate, setInputDate] = useState<Date | null>(new Date()); // Input Date Picker
  const [visible, setVisible] = React.useState(false); // Show or Hidden the snackbar
  const {
    data: myData,
    loading: loadingMe,
    error: errorMe,
  } = useFetch<User>({endpoint: `/user/me`, token: accessToken});

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  // console.log(myData, loading, error);
  const {
    register,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues: {
      email: '',
      phone_number: '',
      birthdate: '2024-11-06T04:00:00.000Z',
      profileImg: '',
    },
  });

  useEffect(() => {
    if (myData) {
      setValue('email', myData?.email || '');
      setValue('phone_number', String(myData?.phoneNumber));
      // setValue('birthdate', String(myData?.birthdate));
      myData.birthDate
        ? setInputDate(new Date(myData.birthDate))
        : setInputDate(null);
    }
    return () => {};
  }, [myData]);

  const onSubmit = (data: BodyData) => {
    let formData = new FormData();
    if (data.email) formData.append('email', data.email);
    if (data.phone_number) formData.append('phone_number', data.phone_number);
    if (data.birthdate) formData.append('birthdate', String(inputDate));
    // console.log('This is the data to submit', formData);
    // setLoading(true);
    setErrorMessage(null);
    fetch(`${config.SERVER}/user/update/me`, {
      method: 'PATCH',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log('RESPONSE: ', response);
        // setFormEdit(false);
        onToggleSnackBar();
        if (response?.statusCode) setErrorMessage(response.message);
      })
      .catch(err => {
        console.log('ERROR: ', err);
        setErrorMessage(err.message);
      })
      .finally(() => {
        // setLoading(false);
      });
    // usePatchFormData('/user/update/me', formData, token!)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  const stylesC = stylesCustom();

  return (
    <View>
      <Text style={stylesC.title}>Actualizar mis datos personales</Text>
      {myData && !loadingMe ? (
        <Card mode="elevated">
          <Card.Content style={stylesC.formGroup}>
            <Controller
              control={control}
              rules={{
                validate: value => {
                  // console.log({value});
                  // return !!value || '*Campo requerido';
                  return true;
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  mode="outlined"
                  keyboardType="default"
                  label="Email"
                  placeholder="Email"
                  value={value}
                  // style={stylesC.formInput}
                  outlineStyle={stylesC.formInputOutline}
                  onChangeText={onChange}
                  // onBlur={onBlur}
                  right={<TextInput.Icon icon="email" />}
                  {...register('email', {
                    required: false,
                  })}
                />
              )}
              name="email"
            />
            {errors.email && (
              <HelperText padding="normal" type="error" visible={true}>
                {errors.email.message || '*Campo obligatorio'}
              </HelperText>
            )}
            <Controller
              control={control}
              rules={{
                validate: value => {
                  // console.log({value});
                  // return !!value || '*Campo requerido';
                  return true;
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  mode="outlined"
                  keyboardType="number-pad"
                  label="Número de celular"
                  placeholder="Número de celular"
                  value={value}
                  style={stylesC.formInput}
                  // outlineColor={'red'}
                  outlineStyle={stylesC.formInputOutline}
                  onChangeText={onChange}
                  // onBlur={onBlur}
                  right={<TextInput.Icon icon="cellphone" />}
                  {...register('phone_number', {
                    required: false,
                  })}
                />
              )}
              name="phone_number"
            />
            {errors.phone_number && (
              <HelperText padding="normal" type="error" visible={true}>
                {errors.phone_number.message || '*Campo obligatorio'}
              </HelperText>
            )}
            {/* <Text style={stylesC.textColor}>
                      Carnet de identidad con el que se encuentra registrado
                    </Text> */}
            <View
              style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
              <DatePickerInput
                style={stylesC.formInput}
                outlineStyle={stylesC.formInputOutline}
                locale="es"
                mode="outlined"
                label="Fecha de nacimiento"
                value={inputDate}
                onChange={d => setInputDate(d)}
                inputMode="start"
              />
            </View>
            {errorMessage && (
              <HelperText padding="normal" type="error">
                {errorMessage}
              </HelperText>
            )}
          </Card.Content>
          <Card.Content>
            <Button
              mode="elevated"
              buttonColor="#009A2B"
              style={stylesC.loginButton}
              onPress={handleSubmit(onSubmit)}
              // onPress={onToggleSnackBar}
              disabled={isSubmitting}>
              <Text style={stylesC.loginButtonText}>
                {isSubmitting ? 'Guardando...' : ' Actualizar mis datos'}
              </Text>
            </Button>
          </Card.Content>
        </Card>
      ) : (
        <LoadingActivity title="Cargando mis datos..." size="large" />
      )}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={4000}
        action={{
          label: 'Cerrar',

          onPress: () => {
            setFormEdit(false);
          },
        }}>
        Editado correctamente!
      </Snackbar>
    </View>
  );
}

function stylesCustom() {
  const {colors} = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      minHeight: 800,
      // height: '100%',
      // backgroundColor: 'green',
      justifyContent: 'space-between',
      borderRadius: 10,
    },
    firstCard: {},
    secondCard: {
      backgroundColor: colors.onBackground,
      // width: '100%',
      // height: '45%',
      minHeight: 200,
    },
    thirdCard: {
      backgroundColor: colors.secondary,
    },
    title: {
      fontSize: 22,
      // alignSelf: 'center',
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.background,
      marginBottom: 10,
    },
    formGroup: {
      // paddingTop: 20,
      marginBottom: 15,
    },
    formInput: {
      marginTop: 8,
    },
    formInputOutline: {
      borderRadius: 10,
    },
    loginButton: {
      // backgroundColor: '#009A2B',
      borderRadius: 10,
      padding: 5,
    },
    loginButtonText: {
      color: colors.onBackground,
      fontWeight: 'bold',
      fontSize: 15,
    },
    textColor: {
      color: colors.onBackground,
      fontSize: 15,
    },
    errorText: {
      fontSize: 14,
      paddingLeft: 10,
      color: 'red',
      // marginTop: 5,
      // marginLeft: 20,
    },
  });
  return styles;
}
