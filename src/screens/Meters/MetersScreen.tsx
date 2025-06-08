import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import ErrorMessage from '../../components/Error/Error';
import LoadingActivity from '../../components/LoadingActivity/LoadingActivity';
import MainTable from '../../components/Table/MainTable';
import {STACK_NAMES} from '../../configs/screenNames';
import {useAuthContext} from '../../context/AuthContext';
import {formatDate} from '../../helpers/formatDate';
import useFetch from '../../hooks/useFetch';
import LayoutContainer from '../../layouts/LayoutContainer';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';
import {Meters, WaterMeter} from './interfaces/meter.interface';
import {useThemeContext} from '../../context/ThemeContext';
import {ThemeColors} from '../../themes/theme';

export default function MetersScreen() {
  const navigation = useNavigation();
  const {accessToken} = useAuthContext();
  const {
    theme: {colors},
  } = useThemeContext();
  const [eventTrigger, setEventTrigger] = useState(new Date());
  const {
    data: meters,
    loading,
    error,
    handleCancelRequest,
  } = useFetch<Meters>({
    endpoint: '/meter?status=true',
    eventTrigger,
    token: accessToken,
  });

  const handleEdit = (item: WaterMeter) => {
    // Lógica para editar la fila seleccionada
    // console.log('Edit item:', item);
    navigation.navigate(STACK_NAMES.FORM_METER.path, item);
  };

  const columns = [
    // {key: '_id', label: 'ID'},
    {key: 'name', label: 'Nombre'},
    {key: 'surname', label: 'Apellido'},
    {key: 'ci', label: 'CI'},
    {key: 'meter_number', label: 'Medidor'},
    // {key: 'status', label: 'Estado'},
    // Define más columnas según sea necesario
  ];

  const style = stylesC(colors as ThemeColors);
  return (
    <LayoutContainer>
      <ScrollViewContainer>
        <View>
          <Text style={style.title}>
            Lecturar consumo de agua mes {formatDate(new Date(), 'MMMM')}
          </Text>
          {meters && !loading && (
            <MainTable
              columns={columns}
              data={meters.waterMeters}
              onEdit={handleEdit}
            />
          )}
          {loading && !error && (
            <LoadingActivity title="Cargando usuarios ..." />
          )}
          {error && (
            <ErrorMessage
              onRetry={() => setEventTrigger(new Date())}
              message={`Error al cargar los medidores: ${error.message}`}
            />
          )}
        </View>
      </ScrollViewContainer>
    </LayoutContainer>
  );
}

function stylesC(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.onBackground,
    },
  });
}
