import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Card} from 'react-native-paper';
import MaterialIcon from '../MaterialIcon/MaterialIcon';

type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorMessage({message, onRetry}: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Card style={styles.card} elevation={3}>
        <Card.Content style={styles.content}>
          <MaterialIcon name="alert-circle" size={48} color="#e53935" />
          <MaterialIcon name="cloud-off-outline" size={36} color="#bdbdbd" />
          <Text style={styles.title}>¡Ups! Ocurrió un error</Text>
          <Text style={styles.message}>
            {message ||
              'No se pudo conectar con el servidor. Por favor, intenta de nuevo.'}
          </Text>
          {onRetry && (
            <Button
              mode="contained"
              icon="refresh"
              style={styles.button}
              onPress={onRetry}
              buttonColor="#009A2B">
              Reintentar
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
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#e53935',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
});
