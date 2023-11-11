import { AxiosError, type AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import { ErrorMessages, Severity } from '../enum';
import { ISnackBar } from '../context/SnackbarContext';

interface IAxiosErrorHandler<T> {
  endpoint: string;
  payload?: T;
  methodType: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  logout?: () => void;
  // eslint-disable-next-line no-unused-vars
  snackbarShowMessage: ISnackBar;
}

const axiosErrorHandler = async <T>({
  endpoint,
  payload,
  methodType,
  logout,
  snackbarShowMessage,
}: IAxiosErrorHandler<T>) => {
  if (methodType.trim() === '') {
    throw new Error(ErrorMessages.MethodTypeMissing);
  }
  try {
    let response = {} as AxiosResponse;

    if (methodType === 'GET') {
      response = await axiosInstance.get(endpoint);
    } else if (methodType === 'POST') {
      response = await axiosInstance.post(endpoint, payload);
    } else if (methodType === 'PUT') {
      response = await axiosInstance.put(endpoint, payload);
    } else if (methodType === 'DELETE') {
      response = await axiosInstance.delete(endpoint);
    } else if (methodType === 'PATCH') {
      response = await axiosInstance.patch(endpoint, payload);
    }
    if (response.status >= 200 && response.status < 300) {
      return response.data ?? null;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if ((error.response.status === 401 || error.response.status === 403) && logout) {
          snackbarShowMessage(
            error.response?.data?.message || ErrorMessages.ErrorMessage,
            Severity.Error,
          );
          logout();
        } else {
          snackbarShowMessage(
            error.response?.data?.message || ErrorMessages.ErrorMessage,
            Severity.Error,
          );
          throw new Error(error.response?.data?.message);
        }
      } else if (error.request) {
        snackbarShowMessage(error.message || 'Something went wrong', Severity.Error);
      }
    }
  }
};

export default axiosErrorHandler;
