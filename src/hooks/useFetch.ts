import {useEffect, useState, useRef} from 'react';
import {AxiosError} from 'axios';
import axiosInstance from './axiosConfig';

type FetchApi<T> = {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
  handleCancelRequest?: () => void;
};

type Props = {
  endpoint: string;
  eventTrigger?: any;
  token?: string;
};

export default function useFetch<T>({
  endpoint,
  eventTrigger,
  token,
}: Props): FetchApi<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  // Usamos useRef para evitar que cause rerenders
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    controllerRef.current = abortController;

    setLoading(true);
    setError(null);
    setData(null);

    axiosInstance
      .get(endpoint, {
        headers: token ? {Authorization: `Bearer ${token}`} : {},
        signal: abortController.signal,
      })
      .then(response => {
        setData(response.data);
      })
      .catch((err: AxiosError) => {
        if (!abortController.signal.aborted) {
          setError(err);
        }
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [endpoint, eventTrigger, token]); // Eliminamos `controller` de aquí

  const handleCancelRequest = () => {
    controllerRef.current?.abort();
    setError(new AxiosError('La solicitud fue cancelada.'));
    setLoading(false);
  };

  return {data, loading, error, handleCancelRequest};
}
