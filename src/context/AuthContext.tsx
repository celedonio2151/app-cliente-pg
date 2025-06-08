import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {User} from '../screens/Account/interfaces/user.interface';

// Definir las propiedades del contexto
interface AuthContextProps {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  userProfile: User | undefined;
  loading: boolean;
  setAccessToken: (token: string) => Promise<void>;
  setRefreshToken: (token: string) => Promise<void>;
  setProfile: (profile: User) => Promise<void>;
  logout: () => Promise<void>;
}

// Crear un contexto con un valor inicial nulo
const AuthContext = createContext<AuthContextProps | null>(null);

// Proveedor del contexto
export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [accessToken, setAccessTokenL] = useState<string | undefined>(
    undefined,
  );
  const [refreshToken, setRefreshTokenL] = useState<string | undefined>(
    undefined,
  );
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Cargar el token y el perfil al montar el componente
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem('accessToken');
        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
        const storedProfile = await AsyncStorage.getItem('userProfile');

        if (storedAccessToken) setAccessTokenL(storedAccessToken);
        if (storedRefreshToken) setRefreshTokenL(storedRefreshToken);
        if (storedProfile) setUserProfile(JSON.parse(storedProfile));
      } catch (error) {
        console.error('Error al cargar los datos de autenticación:', error);
        Alert.alert('Error', 'Error al cargar la sesión');
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // Función para establecer el accessToken
  const setAccessToken = async (token: string) => {
    try {
      setAccessTokenL(token);
      await AsyncStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Error al guardar el accessToken:', error);
      Alert.alert('Error', 'Error al guardar el accessToken');
    }
  };

  // Función para establecer el refreshToken
  const setRefreshToken = async (token: string) => {
    try {
      setRefreshTokenL(token);
      await AsyncStorage.setItem('refreshToken', token);
    } catch (error) {
      console.error('Error al guardar el refreshToken:', error);
      Alert.alert('Error', 'Error al guardar el refreshToken');
    }
  };

  // Función para establecer el perfil de usuario
  const setProfile = async (profile: User) => {
    try {
      setUserProfile(profile);
      const jsonValue = JSON.stringify(profile);
      await AsyncStorage.setItem('userProfile', jsonValue);
    } catch (error) {
      console.error('Error al guardar el perfil del usuario:', error);
      Alert.alert('Error', 'Error al guardar el perfil del usuario');
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      setAccessTokenL(undefined);
      setRefreshTokenL(undefined);
      setUserProfile(undefined);
      await AsyncStorage.multiRemove([
        'accessToken',
        'refreshToken',
        'userProfile',
      ]);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        accessToken,
        refreshToken,
        userProfile,
        setAccessToken,
        setRefreshToken,
        setProfile,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe ser usado dentro de un AuthProvider');
  }
  return context;
};
