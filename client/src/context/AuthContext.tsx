/* eslint-disable no-unused-vars */
import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosErrorHandler from '../config/axiosErrorHandler';
import useSessionStorage from '../hooks/useSessionStorage';
import { REGISTER_URL, LOGIN_URL, USER_ROUTES_COMMON_URL } from '../services';
import { SnackbarContext } from './SnackbarContext';
import { Severity } from '../enum';
interface IRegisterUser {
  email: string;
  password: string;
  username: string;
}
interface ILoginUser {
  email: string;
  password: string;
}

interface IAuthContext {
  authToken: string | null;
  login: (data: ILoginUser) => void;
  logout: () => void;
  register: (data: IRegisterUser) => Promise<boolean>;
  userProfile: IUserProfile;
  updateUserProfile: (userInfo: IUserProfile) => void;
  isFirstTimeUser: (userId: string) => Promise<boolean | null>;
}
interface IUserProfile {
  email: string;
  username: string;
  userId: string;
  profilePhoto: string;
  followers: string[];
  followingUsers: string[];
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { snackbarShowMessage } = useContext(SnackbarContext);
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [userProfile, setUserProfile] = useState<IUserProfile>({} as IUserProfile);
  const [authToken, setAuthToken] = useSessionStorage('auth', null);
  const navigate = useNavigate();

  function updateUserProfile(userProfileInfo: IUserProfile) {
    setUserProfile(userProfileInfo);
  }

  const register = async (registerCred: IRegisterUser): Promise<boolean> => {
    const response = await axiosErrorHandler<IRegisterUser>({
      endpoint: REGISTER_URL,
      methodType: 'POST',
      payload: registerCred,
      logout,
      snackbarShowMessage,
    });
    if (response) {
      snackbarShowMessage('Registered successfully', Severity.Success);

      return true;
    } else {
      return false;
    }
  };
  const isFirstTimeUser = async (userId: string): Promise<boolean | null> => {
    const response = await axiosErrorHandler({
      endpoint: USER_ROUTES_COMMON_URL + userId,
      methodType: 'GET',
      logout,
      snackbarShowMessage,
    });
    if (response) {
      return response.isUserProvidedAllProfileData ?? true ? false : true;
    }
    return null;
  };
  const login = async (loginCred: ILoginUser) => {
    const response = await axiosErrorHandler({
      endpoint: LOGIN_URL,
      methodType: 'POST',
      payload: loginCred,
      logout,
      snackbarShowMessage,
    });
    if (response) {
      snackbarShowMessage('Login successfully', Severity.Success);
      setAuthToken(response.accessToken);
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setAuthToken(null);
    navigate('/', { replace: true });
  };

  const value = {
    authToken,
    register,
    login,
    logout,
    userProfile,
    updateUserProfile,
    isFirstTimeUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
