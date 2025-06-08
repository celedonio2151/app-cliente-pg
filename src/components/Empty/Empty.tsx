import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';
import MaterialIcon from '../MaterialIcon/MaterialIcon';

type EmptyStateProps = {
  message?: string;
  onReload?: () => void;
};

export default function EmptyMessage({message, onReload}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Card style={styles.card} elevation={2}>
        <Card.Content style={styles.content}>
          <MaterialIcon name="inbox" size={48} color="#bdbdbd" />
          <Text style={styles.title}>Sin resultados</Text>
          <Text style={styles.message}>
            {message || 'No hay datos para mostrar en este momento.'}
          </Text>
          {onReload && (
            <Button
              mode="outlined"
              icon="reload"
              style={styles.button}
              onPress={onReload}
              textColor="#009A2B">
              Recargar
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
    borderColor: '#009A2B',
  },
});
