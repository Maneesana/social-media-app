import { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../../../../../context';
import CustomInput from '../Input/CustomInput';
import { Button, FormControl, FormLabel, Box, Typography } from '@mui/material';

interface ILoginForm {
  email: string | null;
  password: string;
}
interface ISignUpForm {
  email: string | null;
  password: string;
  confirmPassword: string;
  username: string | null;
}

const AuthForm = () => {
  const { login, register } = useContext(AuthContext);
  const [isSignMode, setIsSignUpMode] = useState(false);
  const [loginFormData, setLoginFormData] = useState<ILoginForm>({
    email: null,
    password: '',
  } as ILoginForm);
  const [signUpFormData, setSignUpFormData] = useState<ISignUpForm>({
    email: null,
    password: '',
    username: null,
    confirmPassword: '',
  } as ISignUpForm);

  function clearSignUpForm() {
    setSignUpFormData({ email: null, password: '', username: null, confirmPassword: '' });
  }
  function clearLoginForm() {
    setLoginFormData({
      email: null,
      password: '',
    });
  }
  async function signUpHandler(e: FormEvent) {
    e.preventDefault();
    const isSignupFormValidated =
      signUpFormData.email !== null &&
      signUpFormData.username !== null &&
      signUpFormData.password.length >= 6 &&
      signUpFormData.confirmPassword === signUpFormData.password &&
      signUpFormData.email.includes('@') &&
      signUpFormData.username.trim() !== '';
    if (isSignupFormValidated) {
      const isUserRegistered = await register({
        email: signUpFormData.email as string,
        password: signUpFormData.password,
        username: signUpFormData.username as string,
      });
      if (isUserRegistered) {
        setIsSignUpMode(false);
        clearSignUpForm();
      } else {
        clearSignUpForm();
      }
    }
  }

  async function loginHandler(e: FormEvent) {
    e.preventDefault();

    const isLoginFormValidated =
      loginFormData.email !== null &&
      loginFormData.email.includes('@') &&
      loginFormData.password.length >= 6;

    if (isLoginFormValidated) {
      await login({
        email: loginFormData.email as string,
        password: loginFormData.password,
      });

      clearLoginForm();
    }
  }

  return (
    <>
      {/*  login form */}
      {!isSignMode ? (
        <FormControl
          onSubmit={loginHandler}
          component='form'
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, margin: 1 }}
        >
          <Typography sx={{ color: '#2662bd' }} variant='h3'>
            Login
          </Typography>
          <Box>
            <FormLabel required color='secondary'>
              Email
            </FormLabel>
            <CustomInput
              type='email'
              placeholder='Enter your email'
              value={loginFormData.email || ''}
              onChange={(e) => {
                setLoginFormData({ ...loginFormData, email: e.target.value });
              }}
            />
            {loginFormData.email !== null && !loginFormData.email.includes('@') && (
              <Typography sx={{ color: 'red', fontSize: '12px' }} variant='h6'>
                Email must include @
              </Typography>
            )}
            <FormLabel required color='secondary'>
              Password
            </FormLabel>
            <CustomInput
              type='password'
              placeholder='Enter your password'
              value={loginFormData.password}
              onChange={(e) => {
                setLoginFormData({ ...loginFormData, password: e.target.value });
              }}
            />
            {loginFormData.password !== '' && loginFormData.password.length < 6 && (
              <Typography sx={{ color: 'red', fontSize: '12px' }} variant='h6'>
                Password must be at least 6 characters long
              </Typography>
            )}
          </Box>
          <Button type='submit' variant='contained' sx={{ width: '120px' }}>
            Login
          </Button>

          <Button
            type='button'
            onClick={() => setIsSignUpMode(true)}
            sx={{
              color: '#2764c2',
              fontSize: '15px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Create an account
          </Button>
        </FormControl>
      ) : (
        <FormControl
          component='form'
          onSubmit={signUpHandler}
          sx={{ display: 'flex', alignItems: 'center', gap: 2, margin: 1 }}
        >
          <Typography sx={{ color: '#2662bd' }} variant='h3'>
            Sign Up
          </Typography>
          <Box>
            <FormLabel required color='secondary'>
              Username
            </FormLabel>
            <CustomInput
              type='text'
              placeholder='Username'
              value={signUpFormData.username ?? ''}
              onChange={(e) => {
                setSignUpFormData({ ...signUpFormData, username: e.target.value });
              }}
            />
            {signUpFormData.username === '' && (
              <Typography sx={{ color: 'red', fontSize: '12px' }} variant='h6'>
                This field cannot be empty
              </Typography>
            )}
            <FormLabel required color='secondary'>
              Email
            </FormLabel>
            <CustomInput
              type='email'
              placeholder='Enter your email'
              value={signUpFormData.email || ''}
              onChange={(e) => {
                setSignUpFormData({ ...signUpFormData, email: e.target.value });
              }}
            />
            {signUpFormData.email !== null && !signUpFormData.email.includes('@') && (
              <Typography sx={{ color: 'red', fontSize: '12px' }} variant='h6'>
                Email must include @
              </Typography>
            )}
            <FormLabel required color='secondary'>
              Password
            </FormLabel>
            <CustomInput
              type='password'
              placeholder='Enter your password'
              value={signUpFormData.password}
              onChange={(e) => {
                setSignUpFormData({ ...signUpFormData, password: e.target.value });
              }}
            />
            {signUpFormData.password !== '' && signUpFormData.password.length < 6 && (
              <Typography sx={{ color: 'red', fontSize: '12px' }} variant='h6'>
                Password must be at least 6 characters long
              </Typography>
            )}
            <FormLabel required color='secondary'>
              Confirm Password
            </FormLabel>
            <CustomInput
              type='password'
              placeholder='Confirm your password'
              value={signUpFormData.confirmPassword}
              onChange={(e) => {
                setSignUpFormData({ ...signUpFormData, confirmPassword: e.target.value });
              }}
            />
            {signUpFormData.confirmPassword !== '' &&
              signUpFormData.confirmPassword !== signUpFormData.password && (
                <Typography sx={{ color: 'red', fontSize: '12px' }} variant='h6'>
                  Your password is not matching
                </Typography>
              )}
          </Box>
          <Button type='submit' variant='contained' sx={{ width: '120px' }}>
            Sign Up{' '}
          </Button>
          <Button
            type='button'
            onClick={() => setIsSignUpMode(false)}
            sx={{
              color: '#2764c2',
              fontSize: '15px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Go to Login
          </Button>
        </FormControl>
      )}
    </>
  );
};
export default AuthForm;
