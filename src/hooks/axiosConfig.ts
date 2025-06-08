import axios from 'axios';
import {config} from '../configs/config';

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: config.SERVER, // URL base para todas las peticiones
  timeout: 5000, // Tiempo máximo de espera (ms) antes de cancelar la petición
  headers: {
    Accept: 'application/json', // Tipos de respuesta aceptados
    'Content-Type': 'application/json', // Tipo de contenido enviado en las peticiones
    'Cache-Control': 'no-cache', // Indica que no se debe cachear la respuesta
  },
});

console.log('🚀 ~ SERVER:', config.SERVER);
export default axiosInstance;
