import { Button, Stack } from '@mui/material';
import { CommonFileInput, CommonModal } from '../../../../../../components';
import { useState } from 'react';
import UserProfileDetailsForm from '../../../../userProfileDetailsForm';
const OthersProfileViewSection = () => {
  const [isEditCoverModalOpen, setIsEditCoverModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  function modalHandler(modalAction: 'close' | 'open' = 'open', modalType: string) {
    if (modalAction === 'close' && modalType === 'profile') setIsEditProfileModalOpen(false);
    if (modalAction === 'open' && modalType === 'profile') setIsEditProfileModalOpen(true);
    if (modalAction === 'close' && modalType === 'cover') setIsEditCoverModalOpen(false);
    if (modalAction === 'open' && modalType === 'cover') setIsEditCoverModalOpen(true);
  }

  return (
    <>
      <Stack spacing={7} sx={{ position: 'absolute', left: '1000px', top: '200px' }}>
        <Button
          onClick={() => modalHandler('open', 'cover')}
          sx={{
            width: '172px',
            height: '44.67px',
            textTransform: 'capitalize',
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            color: '#A303A0',
            ':hover': {
              background: '#f7f2fa',
            },
          }}
        >
          Edit cover photo
        </Button>
        <Button
          onClick={() => modalHandler('open', 'profile')}
          sx={{
            width: '172px',
            height: '44.67px',
            textTransform: 'capitalize',
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            color: '#A303A0',
            border: '1px solid #A303A0',
            ':hover': {
              background: '#f7f2fa',
            },
          }}
        >
          Edit profile
        </Button>
      </Stack>
      <CommonModal
        isModalOpen={isEditProfileModalOpen}
        modalHandler={(action) => modalHandler(action, 'profile')}
      >
        <UserProfileDetailsForm />
      </CommonModal>
      <CommonModal
        isModalOpen={isEditCoverModalOpen}
        modalHandler={(action) => modalHandler(action, 'cover')}
      >
        <CommonFileInput />
      </CommonModal>
    </>
  );
};

export default OthersProfileViewSection;
