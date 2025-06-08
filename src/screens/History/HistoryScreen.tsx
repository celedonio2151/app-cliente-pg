import {Alert, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {
  Button,
  Card,
  Divider,
  Text,
  IconButton,
  useTheme,
  Portal,
  Modal,
} from 'react-native-paper';

import LayoutContainer from '../../layouts/LayoutContainer';
import useFetch from '../../hooks/useFetch';
import {useAuthContext} from '../../context/AuthContext';
import {Reading, Readings} from './interfaces/reading.interface';
import MaterialIcon from '../../components/MaterialIcon/MaterialIcon';
import {formatDate} from '../../helpers/formatDate';
import LoadingActivity from '../../components/LoadingActivity/LoadingActivity';
import ErrorMessage from '../../components/Error/Error';
import EmptyMessage from '../../components/Empty/Empty';
import {ThemeColors} from '../../themes/theme';
import {useThemeContext} from '../../context/ThemeContext';
import GenerateQRBNB from './components/GenerateQR';
import {GenerateQR} from './interfaces/regerateQR';
import usePost from '../../hooks/usePost';
import PDFView from './components/PDFView';

export default function HistoryScreen() {
  const [pagination, setPagination] = useState({limit: 6, offset: 0});
  const [readings, setReadings] = useState<Reading[]>([]);
  const [readingId, setReadingId] = useState<string>('');
  const [visible, setVisible] = useState(false); // Show or hide modal window
  const [refreshing, setRefreshing] = useState(false);
  const [showInvoice, setShowInvoice] = useState<boolean>(false);
  const [showQR, setShowQr] = useState<boolean>(false);
  const [responseBNB, setResponseBNB] = useState<GenerateQR | null>(null);
  const {accessToken, userProfile, loading: loadingContext} = useAuthContext();
  const {
    theme: {colors},
  } = useThemeContext();

  const {data, error, loading} = useFetch<Readings>({
    endpoint: `/reading/ci/${userProfile?.ci}?order=DESC&limit=${pagination.limit}&offset=${pagination.offset}`,
    eventTrigger: pagination, // trigger fetch on pagination change
    token: accessToken,
  });
  const {post, loading: loadingQR, error: errorQR} = usePost();

  // Cargar más datos o refrescar
  useEffect(() => {
    if (data?.readings) {
      if (pagination.offset === 0) {
        setReadings(data.readings); // Si es refresh o primera carga, reemplaza
      } else {
        setReadings(prev => [...prev, ...data.readings]); // Si es scroll, concatena
      }
    }
    if (refreshing) setRefreshing(false);
    return () => setRefreshing(false); // Limpiar estado de refresco al desmontar
  }, [data]);

  const showModal = () => setVisible(true);
  const hideModal = () => (
    setVisible(false),
    setShowInvoice(false),
    setShowQr(false),
    setResponseBNB(null)
  );

  // Refrescar lista
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPagination({limit: 6, offset: 0});
  }, []);

  // Scroll infinito
  const loadMore = () => {
    if (loading || !data) {
      return;
    }
    if (readings.length >= (data.total || 0)) {
      return;
    }
    setPagination(prev => ({
      ...prev,
      offset: prev.offset + prev.limit,
    }));
  };

  const handleOnPay = async (reading_id: string) => {
    console.log('Pagar con QR:', reading_id);
    setShowQr(true);
    showModal();
    try {
      const response = await post(`/invoice/qr/${reading_id}`, {}, accessToken);
      if (response) {
        console.log('🚀 ~ handleOnPay ~ response:', response);
        setResponseBNB(response);
      }
    } catch (err) {
      if (errorQR) {
        console.error('Error al generar QR:', errorQR);
        Alert.alert(
          'Error al generar QR',
          'No se pudo generar el código QR. Inténtalo de nuevo más tarde.',
        );
      }
      setResponseBNB(null);
      hideModal();
    }
  };

  const handleOnViewInvoice = (reading_id: string) => {
    console.log('Ver recibo:', reading_id);
    setShowInvoice(true);
    showModal();
    setReadingId(reading_id);
  };

  // console.log({data, error, loading});
  const styles = myStyles(colors as ThemeColors);

  return (
    <LayoutContainer noPadding>
      <Text variant="titleLarge">Historial de lecturas</Text>

      <View style={styles.cardFixed}>
        <Portal>
          {showQR && (
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                borderRadius: 10,
                height: '70%',
                backgroundColor: 'white',
                // padding: 10,
                marginHorizontal: 10,
              }}>
              {responseBNB && <GenerateQRBNB responseBNB={responseBNB} />}
              {loadingQR && <LoadingActivity title="Cargando codigo QR" />}
            </Modal>
          )}
          {showInvoice && (
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                // width: '100%',
                margin: 10,
                borderRadius: 10,
                height: '70%',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: 10,
              }}>
              {loadingContext && <LoadingActivity title="Cargando recibo..." />}
              {!loadingContext && accessToken && (
                <PDFView readingId={String(readingId)} token={accessToken} />
              )}
              {/* <Text>PDF</Text> */}
            </Modal>
          )}
        </Portal>
        {/* <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          {`${new Date().getFullYear()}`}
        </Text> */}
        {/* <Button
          mode="elevated"
          icon="qrcode-scan"
          // onPress={() => handleOnPayAll()}
          style={{
            marginBottom: 10,
            backgroundColor: '#FF5C00',
            borderRadius: 10,
          }}
          textColor="white">
          <Text style={{color: 'white', padding: 10, fontSize: 20}}>
            64Bs. Pagar todo
          </Text>
        </Button> */}
      </View>

      {loading && readings.length === 0 && (
        <LoadingActivity title="Cargando lecturas..." />
      )}

      {!loading && data && data.readings.length === 0 && (
        <EmptyMessage
          message="No hay lecturas registradas."
          onReload={onRefresh}
        />
      )}

      {error && (
        <ErrorMessage
          message="No se encontraron lecturas"
          onRetry={onRefresh}
        />
      )}

      <FlatList
        style={styles.flatList}
        data={readings}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <CardContainer
            item={item}
            handleOnPay={handleOnPay}
            handleOnViewInvoice={handleOnViewInvoice}
          />
        )}
        ListFooterComponent={
          loading && readings.length > 0 ? (
            <LoadingActivity title="Cargando más..." />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </LayoutContainer>
  );
}

type Props = {
  item: Reading;
  handleOnPay: (readingId: string) => void;
  handleOnViewInvoice: (readingId: string) => void;
};

const CardContainer = React.memo(
  ({item, handleOnPay, handleOnViewInvoice}: Props) => {
    const isPaid = item.invoice?.isPaid;
    const hasInvoice = item.invoice !== null;

    const buttonProps = {
      icon: hasInvoice ? (isPaid ? 'eye' : 'qrcode-scan') : undefined,
      disabled: !hasInvoice,
      text: hasInvoice
        ? isPaid
          ? 'Ver recibo'
          : `${item.balance} Bs. Pagar`
        : 'Sin factura',
      color: isPaid ? 'gray' : '#009A2B',
    };

    const styles = myStyles(useTheme().colors as ThemeColors);
    const statusChip = !hasInvoice ? (
      <IconButton
        mode="contained-tonal"
        icon="invoice-text-remove"
        style={styles.chipSinFactura}
      />
    ) : isPaid ? (
      <IconButton
        mode="contained-tonal"
        icon="invoice-list"
        style={styles.chipPagado}
      />
    ) : (
      <IconButton
        mode="contained-tonal"
        icon="hand-coin"
        style={styles.chipPendiente}
      />
    );
    return (
      <Card mode="elevated" style={styles.cardContainer}>
        <Card.Content style={styles.boxContainer}>
          <View style={styles.boxHorizontal}>
            <MaterialIcon name="calendar" size={28} color="#009A2B" />
            <Text style={styles.textPrimary}>
              {formatDate(item.date, 'MMMM').toLocaleUpperCase()}
            </Text>
            <Text style={{paddingTop: 4, color: 'black'}}>
              {`  ${formatDate(item.date, 'YYYY')}`}
            </Text>
          </View>
          <View style={styles.boxHorizontal}>
            <MaterialIcon name="water" size={28} color="skyblue" />
            <Text style={styles.textPrimary}>
              {item.cubicMeters} m{'\u00B3'}
            </Text>
          </View>
        </Card.Content>

        <Divider horizontalInset={true} bold={true} />

        <Card.Content style={styles.boxContainer}>
          <Text style={{color: 'black', fontSize: 20}}>
            Anterior {item.balance} Bs.
          </Text>
          {statusChip}
          <Button
            mode="elevated"
            icon={buttonProps.icon}
            disabled={buttonProps.disabled}
            onPress={() =>
              isPaid
                ? handleOnViewInvoice(String(item._id))
                : handleOnPay(String(item._id))
            }
            style={styles.buttonPay}
            buttonColor={buttonProps.color}
            textColor="white">
            {buttonProps.text}
          </Button>
        </Card.Content>
      </Card>
    );
  },
);

function myStyles(colors: ThemeColors) {
  return StyleSheet.create({
    flatList: {
      paddingHorizontal: 10,
    },
    cardFixed: {},
    cardContainer: {
      backgroundColor: '#D9D9D9',
      marginBottom: 10,
      justifyContent: 'space-between',
    },
    boxContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      // backgroundColor: 'green',
      paddingTop: 20,
      paddingBottom: 20,
      alignItems: 'center',
      alignContent: 'center',
    },
    boxHorizontal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // width: '28%',
      // backgroundColor: 'red',
      alignItems: 'center',
    },
    textPrimary: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      paddingLeft: 6,
      alignSelf: 'center',
    },
    buttonPay: {
      // backgroundColor: '#009A2B',
      borderRadius: 10,
      width: '40%',
    },
    chipPagado: {
      backgroundColor: colors.success,
      // backgroundColor: '#C8E6C9',
    },
    chipPendiente: {
      backgroundColor: colors.warning,
    },
    chipSinFactura: {
      backgroundColor: colors.neutral,
    },
  });
}
