import {View, StyleSheet, Dimensions, Linking} from 'react-native';
import React, {JSX, useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Divider,
  Paragraph,
  Title,
  Text,
} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';

import ScrollViewContainer from '../../layouts/ScrollViewContainer';
import LayoutContainer from '../../layouts/LayoutContainer';
import useFetch from '../../hooks/useFetch';
import LoadingActivity from '../../components/LoadingActivity/LoadingActivity';

export interface Photos {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default function HomeScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trigger, setTrigger] = useState(new Date());
  const [page, setPage] = useState(0);
  // const {data, loading, error} = useFetch<Photos[]>({
  //   endpoint: `/list?page=${page}&limit=10`,
  //   token: 'token',
  //   eventTrigger: trigger,
  // });
  const {top} = useSafeAreaInsets();

  const handleOnRefresh = () => {
    console.log('Actualizando');
    setPage(new Date().getSeconds());
    setTrigger(new Date());
    // loading ? setIsRefreshing(true) : setIsRefreshing(false);
    setIsRefreshing(true);
  };

  return (
    <ScrollViewContainer
      isRefreshing={isRefreshing}
      top={top}
      onRefresh={handleOnRefresh}>
      <LayoutContainer>
        {/* Header */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>¡Cuidemos el Agua!</Text>
            <Text style={styles.paragraph}>
              El agua es un recurso esencial para la vida. Descubre su situación
              actual y cómo puedes ayudar.
            </Text>
          </Card.Content>
        </Card>
        {/* Tarjeta de consumo de agua */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Consumo de agua</Title>
            <Paragraph>Controla y monitorea tu consumo de agua.</Paragraph>
          </Card.Content>
          {/* <Card.Cover source={{uri: 'https://picsum.photos/id/16/200/300'}} /> */}
          <Card.Cover
            source={{
              uri: 'https://media.istockphoto.com/id/1287068401/es/foto/agua-del-grifo-y-una-alcanc%C3%ADa-de-pie-junto-a-ella-concepto-de-precio-de-consumo-de-agua.jpg?s=612x612&w=0&k=20&c=IlpJhYjkoKkQOZ5yfJqthsmSQD_V_Ido92ykhACp5Wg=',
            }}
          />
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => {
                /* Manejar navegación */
              }}>
              Ver más
            </Button>
          </Card.Actions>
        </Card>

        {/* Tarjeta de cuidado del agua */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Cuidado del agua</Title>
            <Paragraph>Aprende cómo cuidar el recurso más preciado.</Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri: 'https://lapatria.bo/wp-content/uploads/2022/03/istockphoto-1167498174-612x612-1.jpg',
            }}
          />
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => {
                /* Manejar navegación */
              }}>
              Ver más
            </Button>
          </Card.Actions>
        </Card>

        {/* Tarjeta de contaminación del agua */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Contaminación del agua</Title>
            <Paragraph>
              Conoce los riesgos y cómo evitar la contaminación.
            </Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri: 'https://www.lostiempos.com/sites/default/files/styles/noticia_detalle/public/media_imagen/2022/10/16/agua_uru_uru.jpg?itok=5OCWfat3',
            }}
          />
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => {
                /* Manejar navegación */
              }}>
              Ver más
            </Button>
          </Card.Actions>
        </Card>

        {/* Tarjeta de pagos por consumo */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Pagos por consumo</Title>
            <Paragraph>
              Paga y revisa tu historial de consumos de forma fácil.
            </Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri: 'https://www.diarioelzondasj.com.ar/content/bucket/8/294378w790h445c.jpg.webp',
            }}
          />
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => {
                /* Manejar navegación */
              }}>
              Ver más
            </Button>
          </Card.Actions>
        </Card>
      </LayoutContainer>
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e88e5',
    textAlign: 'center',
  },
  paragraph: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  chartTitle: {
    fontSize: 18,
    marginVertical: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#444',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: '90%',
    backgroundColor: '#1e88e5',
    paddingVertical: 8,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface CardCustomProps {
  author: string;
  width: number;
  height: number;
  photo: string;
}

function CardCustom({
  author,
  width,
  height,
  photo,
}: CardCustomProps): JSX.Element {
  const LeftContent = (props: any) => <Avatar.Icon {...props} icon="account" />;

  return (
    <Card
      mode="elevated"
      elevation={2}
      style={{marginBottom: 20, backgroundColor: 'white'}}>
      <Card.Title title={author} left={LeftContent} />
      <Card.Content>
        <Text variant="titleMedium">Imagenes de Loren Picsum</Text>
        <Text variant="titleSmall">
          Width:{width} {' X '} Height:{height}
        </Text>
      </Card.Content>
      <Card.Cover source={{uri: `${photo}`}} />
      <Card.Actions>
        <Button onPress={() => {}}>Cancel</Button>
        <Button onPress={() => Linking.openURL(photo)}>Descargar</Button>
      </Card.Actions>
    </Card>
  );
}
