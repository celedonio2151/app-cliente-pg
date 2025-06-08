import {View} from 'react-native';
import React from 'react';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';
import LayoutContainer from '../../layouts/LayoutContainer';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ThemeColors} from '../../configs/themes/theme';

const {colors} = ThemeColors;
export default function ExmapleScreen() {
  const navigate = useNavigation();
  return (
    <ScrollViewContainer>
      <LayoutContainer>
        <Text variant="bodyLarge">Exmaple Screen</Text>
        <Button
          mode="elevated"
          buttonColor={colors.primary}
          textColor={colors.onPrimary}
          onPress={() => navigate.navigate('StackExample2')}>
          Navigate another screen
        </Button>
      </LayoutContainer>
    </ScrollViewContainer>
  );
}
