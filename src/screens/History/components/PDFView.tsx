// IMPORTACIONES
import React, {JSX} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

import {config} from '../../../configs/config';
import ScrollViewContainer from '../../../layouts/ScrollViewContainer';
import {dateNameCustom} from '../../../helpers/formatDate';
import requestPermission from '../../../helpers/permissionDownload';

type PropTypes = {
  readingId: string;
  token: string;
};

export default function PDFView({readingId, token}: PropTypes): JSX.Element {
  const source = {
    uri: `${config.SERVER}/invoice/pdf/${readingId}`,
    cache: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const requestStoragePermission = async () => {
    await requestPermission({
      permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      onPermissionDenied: () =>
        Alert.alert('Permiso denegado', 'No se pudo guardar el archivo'),
      onPermissionGranted: () => downloadInvoicePDF(),
    });
  };

  const downloadInvoicePDF = async () => {
    try {
      const date = new Date();
      const invoiceName = `Recibo_${dateNameCustom(
        date,
        'dddd_DD_MMMM_YYYY_HH_mm',
      )}.pdf`;

      const downloadPath =
        Platform.OS === 'android'
          ? `${RNFS.DownloadDirectoryPath}/${invoiceName}`
          : `${RNFS.DocumentDirectoryPath}/${invoiceName}`;

      const downloadOptions = {
        fromUrl: source.uri,
        toFile: downloadPath,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const result = await RNFS.downloadFile(downloadOptions).promise;

      if (result.statusCode === 200) {
        Alert.alert(
          'Descarga completa',
          `El recibo fue guardado en:\n${downloadPath}`,
        );
      } else {
        Alert.alert('Error', 'No se pudo descargar el archivo');
      }
    } catch (error) {
      console.error('Error al descargar PDF:', error);
      Alert.alert('Error', 'Ocurrió un error al descargar el archivo');
    }
  };

  return (
    <ScrollViewContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Mi recibo de pago de agua en PDF</Text>
        <Pdf
          source={source}
          trustAllCerts={false}
          enablePaging={false}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log('Ocurrió un error', error);
          }}
          onPressLink={uri => {
            console.log(`Link presionado: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
      <View style={styles.containerButton}>
        <Button
          mode="elevated"
          buttonColor="green"
          style={styles.downloadButton}
          textColor="white"
          icon={'download'}
          onPress={requestStoragePermission}>
          Descargar
        </Button>
      </View>
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pdf: {
    backgroundColor: 'skyblue',
    flex: 1,
    width: Dimensions.get('window').width,
    height: 450,
  },
  containerButton: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  downloadButton: {
    width: '100%',
  },
});
