import { useState, useEffect } from 'react';
import { type AxiosInstance } from 'axios';

const SetHeaderToken = (Component: any, axios: AxiosInstance) => {
  function WrappedComponent(props: any) {
    const [interceptor] = useState(
      axios.interceptors.request.use((config) => {
        const configObject = config;
        configObject.headers.Authorization = `Bearer ${sessionStorage.getItem('auth')}`;
        return configObject;
      }),
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(interceptor);
      };
    }, []);

    return (
      <>
        <Component {...props} />
      </>
    );
  }
  return WrappedComponent;
};
export default SetHeaderToken;
