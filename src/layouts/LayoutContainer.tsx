import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useThemeContext} from '../context/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean; // permitir quitar padding si es necesario
}

export default function LayoutContainer({
  children,
  style,
  noPadding = false,
}: Props) {
  const {
    theme: {colors},
  } = useThemeContext();

  const baseStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: noPadding ? 0 : 16, // paddings solo si se permiten
    paddingVertical: noPadding ? 0 : 12,
    backgroundColor: colors.background,
  };

  return <SafeAreaView style={[baseStyle, style]}>{children}</SafeAreaView>;
}
