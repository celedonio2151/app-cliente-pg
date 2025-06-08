import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';

import ErrorMessage from '../../components/Error/Error';
import Developed from '../../components/Footer/Developed';
import LoadingActivity from '../../components/LoadingActivity/LoadingActivity';
import {useAuthContext} from '../../context/AuthContext';
import {useThemeContext} from '../../context/ThemeContext';
import useFetch from '../../hooks/useFetch';
import LayoutContainer from '../../layouts/LayoutContainer';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';
import CreateReadingForm from './components/CreateReadingForm';
import {Reading} from './interfaces/reading.interface';
import {ThemeColors} from '../../themes/theme';

export default function ReadingFormScreen({route}: any): React.JSX.Element {
  const waterMeter = route.params;
  const {accessToken} = useAuthContext();
  const {
    theme: {colors},
  } = useThemeContext();
  const {
    data: reading,
    loading,
    error,
    handleCancelRequest,
  } = useFetch<Reading>({
    endpoint: `/reading/${waterMeter._id}`,
    token: accessToken,
  });

  const styles = customStyles(colors as ThemeColors);

  return (
    <LayoutContainer noPadding>
      <ScrollViewContainer noPadding={false}>
        <View style={styles.container}>
          <Card mode="elevated" style={styles.headerCard}>
            <Card.Content>
              <Text style={styles.title}>Registrar consumo de agua</Text>
              <Text style={styles.subtitle}>
                Completa el formulario para guardar la lectura del medidor.
              </Text>
            </Card.Content>
          </Card>
          {loading && <LoadingActivity title="Cargando lectura..." />}
          {error && (
            <ErrorMessage
              message="Error al cargar lectura"
              onRetry={handleCancelRequest}
            />
          )}
          {reading && !loading && (
            <CreateReadingForm waterMeter={waterMeter} reading={reading} />
          )}
          <Developed />
        </View>
      </ScrollViewContainer>
    </LayoutContainer>
  );
}

function customStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      // padding: 16,
      backgroundColor: 'transparent',
      // backgroundColor: colors.onBackground,
      justifyContent: 'space-between',
    },
    headerCard: {
      backgroundColor: '#fff',
      borderRadius: 16,
      marginBottom: 18,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: {width: 0, height: 2},
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.background,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 15,
      color: colors.backdrop || '#666',
      textAlign: 'center',
      marginBottom: 2,
    },
  });
}
