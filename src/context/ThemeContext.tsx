import React, {createContext, useContext, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MD3DarkTheme, PaperProvider} from 'react-native-paper';
import {DarkTheme, LightTheme} from '../themes/theme';

interface ThemeContextProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  theme: typeof MD3DarkTheme; // or lightTheme
}

// Crear el contexto
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Claves para AsyncStorage
const THEME_KEY = 'user_theme';

// Proveedor del contexto
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const colorScheme = useColorScheme();

  // Cargar el tema desde AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (storedTheme !== null) {
          setIsDarkTheme(storedTheme === 'dark');
        } else {
          // Si no hay un tema guardado, usar el esquema de color del sistema
          setIsDarkTheme(colorScheme === 'dark');
        }
      } catch (error) {
        console.error('Error al cargar el tema:', error);
      }
    };

    loadTheme();
  }, [colorScheme]);

  // Guardar el tema en AsyncStorage
  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkTheme;
      setIsDarkTheme(newTheme);
      await AsyncStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error al guardar el tema:', error);
    }
  };

  // Seleccionar el tema basado en el estado
  const theme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        theme,
      }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

// Hook para usar el contexto
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useThemeContext debe ser usado dentro de un ThemeProvider',
    );
  }
  return context;
};
