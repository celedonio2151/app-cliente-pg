import {View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import {useThemeContext} from '../../context/ThemeContext';

export default function Developed() {
  // const {
  //   theme: {colors},
  // } = useThemeContext();
  return (
    <View style={{marginTop: 10}}>
      <Text variant="bodyMedium" style={{alignSelf: 'center'}}>
        Power by @Skyline with{' '}
        <MaterialIcon name="heart" color={'#FF0000'} size={14} />
      </Text>
    </View>
  );
}
