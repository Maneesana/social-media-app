import { useEffect, useContext } from 'react';
import PrimarySearchAppBar from '../../navbar/PrimarySearchAppBar';

import { SnackbarContext } from '../../../context/SnackbarContext';
import SetHeaderToken from '../../../config/injectToken';
import { AuthContext } from '../../../context';
import axiosErrorHandler from '../../../config/axiosErrorHandler';
import { CURRENT_USER_URL } from '../../../services';
import { axiosInstance } from '../../../config';
import { useLocation } from 'react-router-dom';

interface IUserLayoutProps {
  children: React.ReactNode;
}

const UserLayout = ({ children }: IUserLayoutProps) => {
  const { logout, updateUserProfile, authToken } = useContext(AuthContext);
  const { snackbarShowMessage } = useContext(SnackbarContext);
  const location = useLocation();

  async function getCurrentUserProfile() {
    const response = await axiosErrorHandler({
      endpoint: CURRENT_USER_URL,
      methodType: 'GET',
      snackbarShowMessage,
      logout,
    });
    if (response) {
      updateUserProfile(response.user);
    } else {
      logout();
    }
  }

  useEffect(() => {
    getCurrentUserProfile();
  }, [authToken, location]);
  return (
    <>
      <PrimarySearchAppBar />
      <div>{children}</div>
    </>
  );
};

export default SetHeaderToken(UserLayout, axiosInstance);
