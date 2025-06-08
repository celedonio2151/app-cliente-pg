import React, {JSX} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Pdf from 'react-native-pdf';
// import {Text} from 'react-native-paper';
import {config} from '../../../configs/config';
import {Button, Text} from 'react-native-paper';
import ScrollViewContainer from '../../../layouts/ScrollViewContainer';
// import RNFetchBlob from 'rn-fetch-blob';
import {dateNameCustom} from '../../../helpers/formatDate';
import requestPermission from '../../../helpers/permissionDownload';

type PropTypes = {
  readingId: string;
  token: string;
};

export default function PDFView({readingId, token}: PropTypes): JSX.Element {
  // console.log("🚀 ~ PDFView ~ token:", readingId, token)
  const source = {
    uri: `${config.SERVER}/invoice/pdf/${readingId}`,
    cache: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const source = {
  //   // uri: `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`,
  //   uri: `https://pspdfkit.com/downloads/pspdfkit-android-quickstart-guide.pdf`,
  //   cache: true,
  // };
  const requestStoragePermission = async () => {
    await requestPermission({
      permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      onPermissionDenied: () => console.log('Permission denied'),
      onPermissionGranted: () => downloadInvoicePDF(),
    });
  };

  const downloadInvoicePDF = () => {
    const date = new Date();
    const invoiceName = dateNameCustom(date, 'dddd_DD_MMMM_YYYY_HH_mm');
    // const {dirs} = RNFetchBlob.fs;
    // const dirToSave =
    //   Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    // const configfb = {
    //   fileCache: true,
    //   appendExt: 'pdf',
    //   addAndroidDownloads: {
    //     useDownloadManager: true,
    //     notification: true,
    //     mediaScannable: true,
    //     title: `Recibo22.pdf`,
    //     path: `${dirs.DownloadDir}/Recibo_${invoiceName}.pdf`,
    //   },
    //   useDownloadManager: true,
    //   notification: true,
    //   mediaScannable: true,
    //   title: 'Recibo22.pdf',
    //   date: `${new Date()}`,
    //   path: `${dirToSave}/Recibo_${invoiceName}.pdf`,
    // };
    // const configOptions = Platform.select({
    //   ios: configfb,
    //   android: configfb,
    // });

    //   RNFetchBlob.config(configOptions || {})
    //     .fetch('GET', source.uri, {
    //       Authorization: `Bearer ${token}`,
    //     })
    //     .then(res => {
    //       if (Platform.OS === 'ios') {
    //         RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
    //         RNFetchBlob.ios.previewDocument(configfb.path);
    //       }
    //       if (Platform.OS === 'android') {
    //         console.log('file downloaded');
    //         Alert.alert(
    //           'Recibo descargado correctamente',
    //           'El recibo de pago se guardo en la carpeta de descargas',
    //           [{text: 'Aceptar'}],
    //         );
    //       }
    //     })
    //     .catch(e => {
    //       console.log('invoice Download==>', e);
    //     });
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
            console.log('Noo ocurrio un error', error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
    // width: 100,
    // height: 300,
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
    // height: Dimensions.get('window').height,
    // width: '100%',
    height: 450,
  },
  containerButton: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  downloadButton: {
    width: '100%',
  },
});
