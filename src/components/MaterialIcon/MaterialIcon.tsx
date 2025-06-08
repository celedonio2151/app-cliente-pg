// import MaterialIcons from '@react-native-vector-icons/fontawesome6';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type IconProps = {
  name: any;
  size: number;
  color: string;
  onPress?: () => void; // Opcional para manejar acciones al presionar
};

export default function MaterialIcon({name, size, color, onPress}: IconProps) {
  return (
    <MaterialIcons
      name={name}
      // name='home' // Cambia esto por el nombre del icono que desees
      color={color}
      size={size}
      onPress={onPress} // Usa la prop `onPress` directamente
    />
  );
}
