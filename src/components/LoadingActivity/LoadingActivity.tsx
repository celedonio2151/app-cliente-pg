import React, {JSX} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, MD2Colors, Text} from 'react-native-paper';

interface Props {
  title?: string;
  color?: string;
  size?: 'small' | 'large' | number;
}

export default function LoadingActivity({
  title,
  size = 'large',
  color = 'green',
}: Props): JSX.Element {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      color: MD2Colors.green500,
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 20,
    },
  });
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <ActivityIndicator animating={true} size={size} color={color} />
    </View>
  );
}
