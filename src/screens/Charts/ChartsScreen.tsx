import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';
import LayoutContainer from '../../layouts/LayoutContainer';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuthContext} from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import {ChartsCI} from './interfaces/chart.interfaces';
import {formatDate} from '../../helpers/formatDate';

const screenWidth = Dimensions.get('window').width;

export default function ChartsScreen() {
  const {userProfile, accessToken} = useAuthContext();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {data, loading, error, handleCancelRequest} = useFetch<ChartsCI>({
    endpoint: `/report/ci/${976161161}`,
    token: accessToken,
  });
  const [timeRange, setTimeRange] = useState('daily'); // 'daily', 'weekly', 'monthly', 'yearly', 'decade'

  const getChartMonth = () => {
    const labels = data!.readings.map(reading =>
      formatDate(reading.date, 'MMM'),
    );
    const dataFormat = data!.readings.map(reading => reading.cubicMeters);
    return {labels, datasets: [{data: dataFormat}]};
  };

  console.log('Listado: ', {data, loading, error});
  // Simulated data for different time ranges
  const getData = () => {
    switch (timeRange) {
      case 'daily':
        return {
          labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
          datasets: [{data: [20, 45, 28, 80, 99, 43]}],
        };
      case 'weekly':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{data: [200, 450, 280, 800, 990, 430, 600]}],
        };
      case 'monthly':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{data: [800, 1200, 900, 1500]}],
        };
      case 'yearly':
        return {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: [
                3000, 4000, 3500, 5000, 4500, 6000, 7000, 8000, 7500, 9000,
                8500, 10000,
              ],
            },
          ],
        };
      case 'decade':
        return {
          labels: [
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
            '2020',
            '2021',
            '2022',
            '2023',
            '2024',
          ],
          datasets: [
            {
              data: [
                30000, 32000, 31000, 35000, 34000, 36000, 37000, 38000, 39000,
                40000,
              ],
            },
          ],
        };
      default:
        return {labels: [], datasets: [{data: []}]};
    }
  };

  return (
    <ScrollViewContainer isRefreshing={isRefreshing}>
      <LayoutContainer>
        <Text variant="titleLarge" style={styles.title}>
          Consumo de Agua
        </Text>
        <LineChart
          data={getData()}
          width={screenWidth - 20} // Adjust for padding
          height={220}
          chartConfig={{
            backgroundColor: '#1E2923',
            backgroundGradientFrom: '#08130D',
            backgroundGradientTo: '#1F4037',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {borderRadius: 16},
            propsForDots: {r: '6', strokeWidth: '2', stroke: '#ffa726'},
          }}
          bezier
          style={styles.chart}
        />
        <View style={styles.buttonContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollableButtons}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => setTimeRange('daily')}>
              Diario
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => setTimeRange('weekly')}>
              Semanal
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => setTimeRange('monthly')}>
              Mensual
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => setTimeRange('yearly')}>
              Anual
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => setTimeRange('decade')}>
              Década
            </Button>
          </ScrollView>
        </View>
        {data && !loading && (
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <LineChart
              data={getChartMonth()}
              width={screenWidth * 2} // Adjust for padding
              height={220}
              chartConfig={{
                backgroundColor: '#1E2923',
                backgroundGradientFrom: '#08130D',
                backgroundGradientTo: '#1F4037',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {borderRadius: 16},
                propsForDots: {r: '6', strokeWidth: '2', stroke: '#ffa726'},
              }}
              bezier
              style={styles.chart}
            />
          </ScrollView>
        )}
        <View>
          <Text>Bezier Line Chart</Text>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={screenWidth - 20} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </LayoutContainer>
    </ScrollViewContainer>
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
