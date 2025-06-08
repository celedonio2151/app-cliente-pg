import {View, Text, Linking, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import {useThemeContext} from '../../context/ThemeContext';

export default function EmergencyCall() {
  const [emergency] = useState({
    phone: '71169885',
    message: 'Emergencia por agua potable',
    url: `https://wa.me/${71169885}?text=Emergencia%20por%20agua%20potable`,
  });

  const openWhatsApp = () => {
    Linking.openURL(emergency.url).catch(() =>
      console.error('No se pudo abrir WhatsApp'),
    );
  };
  const styles = customStyles();
  return (
    <View style={styles.footerRow}>
      <Text style={styles.footerText}>{emergency.message}</Text>
      <TouchableOpacity onPress={openWhatsApp} style={styles.iconContainer}>
        <MaterialIcon name="whatsapp" size={28} color="#009A2B" />
      </TouchableOpacity>
      <Text style={styles.footerText}>{emergency.phone}</Text>
    </View>
  );
}

function customStyles() {
  const {
    theme: {colors},
  } = useThemeContext();
  return StyleSheet.create({
    footerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexWrap: 'nowrap',
      gap: 8,
    },
    footerText: {
      color: colors.onBackground,
      fontSize: 15,
      flexShrink: 1,
      maxWidth: '40%',
      textAlign: 'center',
    },
    iconContainer: {
      marginHorizontal: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
