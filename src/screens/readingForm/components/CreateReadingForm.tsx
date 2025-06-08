import {Controller, useForm} from 'react-hook-form';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';

import {useAuthContext} from '../../../context/AuthContext';
import {useThemeContext} from '../../../context/ThemeContext';
import {formatDate} from '../../../helpers/formatDate';
import usePost from '../../../hooks/usePost';
import {WaterMeter} from '../../Meters/interfaces/meter.interface';
import {Reading, ReadingForm} from '../interfaces/reading.interface';
import MeterDetails from './MeterDetails';
import EmergencyCall from '../../../components/Emergency/EmergencyCall';

type Props = {
  waterMeter: WaterMeter;
  reading: Reading;
};

export default function CreateReadingForm({waterMeter, reading}: Props) {
  const {accessToken} = useAuthContext();
  const {post, loading, error} = usePost();
  const {
    theme: {colors},
  } = useThemeContext();
  const {
    handleSubmit,
    formState: {errors, isSubmitting},
    watch,
    control,
    reset,
  } = useForm<ReadingForm>({
    defaultValues: {
      water_meterId: String(waterMeter._id),
      date: formatDate(new Date(), 'DD MMMM YYYY'),
      beforeMonth: {
        date: reading?.lastMonth?.date
          ? formatDate(new Date(reading.lastMonth.date), 'DD MMM YYYY')
          : formatDate(new Date(), 'DD MMM YYYY'),
        value: String(reading?.lastMonth?.value || 0),
      },
      lastMonthValue: '',
      balance: '200',
    },
  });

  const onSubmit = async (data: ReadingForm) => {
    // console.log('Calling server with data:', data);
    let formData = new FormData();
    formData.append('water_meterId', String(waterMeter._id));
    formData.append('date', String(new Date()));
    formData.append(
      'beforeMonth',
      JSON.stringify({
        date: new Date(reading?.lastMonth.date || new Date()),
        meterValue: reading?.lastMonth.value || 0,
      }),
    );
    formData.append('lastMonthValue', data.lastMonthValue);
    formData.append('balance', data.balance);

    // React Native FormData does not support .entries(), so log manually
    // try {
    //   const res = await post('/reading', formData, accessToken);
    //   console.log('🚀 ~ onSubmit ~ response:', res);
    //   if (res) {
    //     Alert.alert('Error', res.message);
    //   }
    // } catch (error) {
    //   console.error('Error creating FormData:', error);
    //   // Alert.alert('Error', 'No se pudo crear la lectura. Inténtalo de nuevo.');
    // }
  };

  const stylesC = customStyles();
  return (
    <Card mode="elevated" elevation={2} style={stylesC.container}>
      <Card.Content style={stylesC.formGroup}>
        <MeterDetails waterMeter={waterMeter} />
        <View style={stylesC.row}>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {value}}) => (
              <TextInput
                mode="outlined"
                label="Fecha lectura anterior"
                style={stylesC.formInputRowFirst}
                outlineStyle={stylesC.formInputOutline}
                activeOutlineColor={stylesC.activeOutlineColor.color}
                contentStyle={stylesC.contentStyle}
                value={value}
                right={<TextInput.Icon icon="calendar" />}
                disabled
              />
            )}
            name="beforeMonth.date"
          />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {value}}) => (
              <TextInput
                mode="outlined"
                label="Lectura anterior"
                style={stylesC.formInputRowSecond}
                outlineStyle={stylesC.formInputOutline}
                contentStyle={stylesC.contentStyle}
                value={value}
                right={<TextInput.Icon icon="gauge" />}
                disabled
              />
            )}
            name="beforeMonth.value"
          />
        </View>
        {/* FECHA DE LECTURA ACTUAL */}
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {value}}) => (
            <TextInput
              mode="outlined"
              label="Fecha actual de lectura"
              style={stylesC.formInput}
              outlineStyle={stylesC.formInputOutline}
              activeOutlineColor={stylesC.activeOutlineColor.color}
              contentStyle={stylesC.contentStyle}
              value={value}
              right={<TextInput.Icon icon="calendar" />}
              disabled
            />
          )}
          name="date"
        />
        {/* LECTURA ACTUAL */}
        <View style={stylesC.row}>
          <Controller
            control={control}
            rules={{
              required: 'Campo obligatorio',
              validate: value =>
                Number(value) >= Number(watch('beforeMonth.value')) ||
                'Debe ser mayor o igual a la lectura anterior',
            }}
            render={({field: {onChange, value}}) => (
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                label={
                  errors.lastMonthValue?.message
                    ? String(errors.lastMonthValue.message)
                    : 'Lectura Actual'
                }
                style={stylesC.formInputRowFirst}
                outlineStyle={stylesC.formInputOutline}
                activeOutlineColor={stylesC.activeOutlineColor.color}
                contentStyle={stylesC.contentStyle}
                onChangeText={onChange} // <-- ¡Esto es lo importante!
                value={value}
                right={<TextInput.Icon icon="gauge" />}
                error={!!errors.lastMonthValue}
              />
            )}
            name="lastMonthValue"
          />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {value}}) => (
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                label="Consumo"
                style={stylesC.formInputRowSecond}
                outlineStyle={stylesC.formInputOutline}
                // activeOutlineColor={stylesC.activeOutlineColor.color}
                theme={{
                  colors: {
                    primary: '#009A2B', // Color del label cuando está enfocado
                    placeholder: '#009A2B', // Color del label cuando NO está enfocado
                    text: colors.onBackground,
                    disabled: '#888',
                  },
                }}
                contentStyle={stylesC.contentStyle}
                value={value}
                right={<TextInput.Icon icon="water" />}
                disabled
              />
            )}
            name="balance"
          />
        </View>
        {errors.lastMonthValue && (
          <Text style={stylesC.errorText}>{errors.lastMonthValue.message}</Text>
        )}
        <Button
          mode="contained"
          buttonColor="#009A2B"
          disabled={isSubmitting}
          style={stylesC.loginButton}
          onPress={handleSubmit(onSubmit)}>
          <Text style={stylesC.loginButtonText}>
            {isSubmitting ? 'Cargando...' : 'Registrar Consumo'}
          </Text>
        </Button>
      </Card.Content>
      <Card.Content style={stylesC.groupFooterOne}>
        <EmergencyCall />
      </Card.Content>
    </Card>
  );
}

function customStyles() {
  const {
    theme: {colors},
  } = useThemeContext();

  return StyleSheet.create({
    container: {
      backgroundColor: colors.elevation.level5,
      borderRadius: 14,
      marginVertical: 10,
      paddingBottom: 8,
    },
    formGroup: {
      paddingTop: 20,
      marginBottom: 10,
      // backgroundColor: 'green',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
    },
    formInput: {marginTop: 8, backgroundColor: colors.elevation.level5},
    formInputRowFirst: {
      marginTop: 8,
      width: '55%',
      backgroundColor: colors.elevation.level5,
    },
    formInputRowSecond: {
      marginTop: 8,
      width: '40%',
      backgroundColor: colors.elevation.level5,
    },
    formInputOutline: {
      borderRadius: 10,
      borderColor: colors.primary,
    },
    activeOutlineColor: {
      color: colors.primary,
    },
    contentStyle: {
      paddingLeft: 10,
      color: colors.onBackground,
    },
    loginButton: {
      borderRadius: 10,
      marginTop: 18,
      marginBottom: 4,
    },
    loginButtonText: {
      color: colors.background,
      fontWeight: 'bold',
      fontSize: 15,
      padding: 5,
    },
    groupFooterOne: {
      // alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
      flexDirection: 'row',
      // backgroundColor: 'red',
    },
    errorText: {
      fontSize: 14,
      color: colors.error || '#e53935',
      marginTop: 4,
      marginBottom: 2,
      textAlign: 'center',
    },
  });
}
