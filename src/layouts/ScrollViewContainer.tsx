import {
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
  RefreshControl,
} from 'react-native';
import React, {ReactNode} from 'react';

import {useThemeContext} from '../context/ThemeContext';

interface Props {
  style?: StyleProp<ViewStyle>;
  isRefreshing?: boolean;
  top?: number;
  onRefresh?: () => void;
  children: ReactNode;
  enableRefresh?: boolean; // Nueva prop
  noPadding?: boolean; // permitir quitar padding si es necesario
}

export default function ScrollViewContainer({
  style,
  isRefreshing = false,
  top,
  onRefresh,
  children,
  enableRefresh = true, // Valor por defecto: refresh habilitado
  noPadding = true,
}: Props): React.JSX.Element {
  const {
    theme: {colors},
  } = useThemeContext();

  const baseStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: noPadding ? 0 : 16, // paddings solo si se permiten
    paddingVertical: noPadding ? 0 : 12,
    // backgroundColor: 'yellow', // colors.background,
    backgroundColor: colors.background,
  };

  return (
    <ScrollView
      style={[baseStyle, style]}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        enableRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            progressViewOffset={top}
            colors={['red', 'orange', 'green']}
            onRefresh={onRefresh}
          />
        ) : undefined
      }>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1, // Establece para que ocupe toda la pantalla
  },
});
