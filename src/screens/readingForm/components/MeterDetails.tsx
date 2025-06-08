import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcon from '../../../components/MaterialIcon/MaterialIcon';
import { WaterMeter } from '../../Meters/interfaces/meter.interface';

type Props = {
  waterMeter: WaterMeter;
};

export default function MeterDetails({waterMeter}: Props): React.JSX.Element {
  const {ci, name, surname, meter_number} = waterMeter;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MaterialIcon name="account" size={24} color="#009A2B" />
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{name + ' ' + surname}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcon name="card-account-details" size={24} color="#009A2B" />
        <Text style={styles.label}>C.I.:</Text>
        <Text style={styles.value}>{ci}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcon name="gauge" size={24} color="#009A2B" />
        <Text style={styles.label}>Medidor:</Text>
        <Text style={styles.value}>{meter_number}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
    paddingLeft: 10,
    width: 90,
  },
  value: {
    fontSize: 16,
    color: '#222',
    flex: 1,
    marginLeft: 4,
  },
});
