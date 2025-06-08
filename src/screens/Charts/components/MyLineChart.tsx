import React from 'react';
import { StyleSheet } from 'react-native';
import {LineChart} from 'react-native-chart-kit';
type Props = {
  rest: LineChart;
};
export default function MyLineChart({rest}: Props) {
  return (
    <LineChart
      {...rest}
      style={styles.chart}
    />
  );
}


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    color: '#0288D1', // Azul agua
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  scrollableButtons: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0288D1', // Azul agua
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    gap: 10,
    // marginTop: 20,
    // marginHorizontal: 10,
  },
});