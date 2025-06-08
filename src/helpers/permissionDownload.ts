import {Platform, PermissionsAndroid, Permission} from 'react-native';

type PermissionOptions = {
  permission: Permission;
  onPermissionGranted: () => void;
  onPermissionDenied?: () => void;
};

export default async function requestPermission({
  permission,
  onPermissionGranted,
  onPermissionDenied,
}: PermissionOptions): Promise<void> {
  if (Platform.OS === 'ios') {
    onPermissionGranted();
    return;
  }

  try {
    const granted = await PermissionsAndroid.request(permission, {
      title: 'Permiso para descargar PDF',
      message:
        'Esta aplicacion necesita acceso a tu alamcenamiento para guardar el PDF',
      buttonNeutral: 'Preguntar mas tarde',
      buttonNegative: 'Cancelar',
      buttonPositive: 'Permitir',
    });
    console.log('🚀 ~ granted:', granted);
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    if (PermissionsAndroid.RESULTS.GRANTED) {
      onPermissionGranted();
    } else {
      onPermissionDenied?.();
      console.log('Permission denied');
    }
  } catch (err) {
    console.log('Error requesting permission:', err);
  }
}
