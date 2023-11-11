import { BaseSyntheticEvent, Reducer, useEffect, useReducer, useContext } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Button,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axiosErrorHandler from '../../../config/axiosErrorHandler';
import { SnackbarContext } from '../../../context/SnackbarContext';
import { USER_ROUTES_COMMON_URL } from '../../../services';
import { AuthContext } from '../../../context';
import { useNavigate } from 'react-router-dom';

interface IProfileData {
  gender: 'male' | 'female' | '' | string;
  birthday: string;
  address: string;
  phone: number | '';
  profilePhoto: string;
  coverPhoto: string;
}

interface IProfileDataAction {
  type:
    | 'add-gender'
    | 'RESET'
    | 'add-birthday'
    | 'add-address'
    | 'add-phone'
    | 'add-profile-photo'
    | 'add-cover-photo';
  payload?: Partial<IProfileData>;
}

const CustomFormControl = styled(FormControl)(() => ({
  m: 1,
  display: 'flex',
  flexDirection: 'row',
  gap: '15px',
  alignItems: 'center',
}));

const profileDataReducer = (state: IProfileData, action: IProfileDataAction): IProfileData => {
  if (action.type === 'add-gender' && action.payload) {
    return {
      ...state,
      gender: action.payload.gender ?? '',
    };
  } else if (action.type === 'add-birthday' && action.payload) {
    return {
      ...state,
      birthday: action.payload.birthday ?? '',
    };
  } else if (action.type === 'add-address' && action.payload) {
    return {
      ...state,
      address: action.payload.address ?? '',
    };
  } else if (action.type === 'add-phone' && action.payload) {
    return {
      ...state,
      phone: action.payload.phone ?? '',
    };
  } else if (action.type === 'add-profile-photo' && action.payload) {
    return {
      ...state,
      profilePhoto: action.payload.profilePhoto ?? '',
    };
  } else if (action.type === 'add-cover-photo' && action.payload) {
    return {
      ...state,
      coverPhoto: action.payload.coverPhoto ?? '',
    };
  } else if (action.type === 'RESET') {
    return {
      gender: '',
      birthday: '',
      address: '',
      phone: '',
      profilePhoto: '',
      coverPhoto: '',
    };
  }
  return {
    gender: '',
    birthday: '',
    address: '',
    phone: '',
    profilePhoto: '',
    coverPhoto: '',
  };
};

const UserProfileDetailsForm = () => {
  const { snackbarShowMessage } = useContext(SnackbarContext);
  const { userProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileData, dispatch] = useReducer<Reducer<IProfileData, IProfileDataAction>>(
    profileDataReducer,
    {
      gender: '',
      birthday: '',
      address: '',
      phone: '',
      profilePhoto: '',
      coverPhoto: '',
    },
  );

  function formSubmitHandler() {
    UpdateUserProfile({
      userId: userProfile.userId,
      isUserProvidedAllProfileData: true,
      ...profileData,
    });
    dispatch({ type: 'RESET' });
  }

  async function UpdateUserProfile(
    userProfileData: { userId: string; isUserProvidedAllProfileData: boolean } & IProfileData,
  ) {
    const response = await axiosErrorHandler({
      endpoint: USER_ROUTES_COMMON_URL + userProfile.userId,
      methodType: 'PUT',
      payload: userProfileData,
      snackbarShowMessage,
    });
    if (response) {
      navigate('profile');
    }
  }

  function uploadFileHandler(e: BaseSyntheticEvent, actionType: 'cover' | 'profile') {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (actionType === 'cover') {
        dispatch({
          type: 'add-cover-photo',
          payload: { coverPhoto: '' + event.target?.result },
        });
      } else if (actionType === 'profile') {
        dispatch({
          type: 'add-profile-photo',
          payload: { profilePhoto: '' + event.target?.result },
        });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {}, []);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: 'column',
          marginTop: '100px',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant='h4'>User Profile Details</Typography>
        <CustomFormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            value={profileData.gender}
            onChange={(e) => {
              dispatch({
                type: 'add-gender',
                payload: { gender: e.target.value },
              });
            }}
            displayEmpty
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
          </Select>
        </CustomFormControl>

        <CustomFormControl>
          <FormLabel>Date of Birth</FormLabel>
          <OutlinedInput
            type='date'
            value={profileData.birthday}
            onChange={(e) => {
              dispatch({
                type: 'add-birthday',
                payload: { birthday: e.target.value },
              });
            }}
          />
        </CustomFormControl>
        <CustomFormControl>
          <FormLabel>Address</FormLabel>
          <OutlinedInput
            type='text'
            value={profileData.address}
            onChange={(e) => {
              dispatch({
                type: 'add-address',
                payload: { address: e.target.value },
              });
            }}
          />
        </CustomFormControl>
        <CustomFormControl>
          <FormLabel>Phone number</FormLabel>
          <OutlinedInput
            type='number'
            value={profileData.phone}
            onChange={(e) => {
              dispatch({
                type: 'add-phone',
                payload: { phone: parseInt(e.target.value) },
              });
            }}
          />
        </CustomFormControl>

        <CustomFormControl>
          <FormLabel>Upload your profile photo</FormLabel>
          <OutlinedInput
            type='file'
            onChange={(e: BaseSyntheticEvent) => {
              uploadFileHandler(e, 'profile');
            }}
          />
        </CustomFormControl>
        <CustomFormControl>
          <FormLabel>Upload your cover photo</FormLabel>
          <OutlinedInput
            type='file'
            onChange={(e: BaseSyntheticEvent) => {
              uploadFileHandler(e, 'cover');
            }}
          />
        </CustomFormControl>

        <Button sx={{ alignSelf: 'center' }} onClick={formSubmitHandler} variant='contained'>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfileDetailsForm;
