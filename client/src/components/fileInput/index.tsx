import React, { BaseSyntheticEvent, useContext, useState } from 'react';
import {
  UploadFileContainer,
  DragFileArea,
  FileBlock,
  ProgressBar,
  UploadButton,
} from './@components';
import { Typography } from '@mui/material';
import axiosErrorHandler from '../../config/axiosErrorHandler';
import { USER_ROUTES_COMMON_URL } from '../../services';
import { AuthContext } from '../../context';
import { SnackbarContext } from '../../context/SnackbarContext';
import { Severity } from '../../enum';

const CommonFileInput = () => {
  const { userProfile, logout } = useContext(AuthContext);
  const { snackbarShowMessage } = useContext(SnackbarContext);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);

  async function uploadCoverPhotoHandler() {
    if (coverPhoto === null) return;
    const response = await axiosErrorHandler({
      endpoint: USER_ROUTES_COMMON_URL + userProfile.userId,
      methodType: 'PUT',
      snackbarShowMessage,
      logout,
      payload: {
        userId: userProfile.userId,
        coverPhoto,
      },
    });
    if (response) {
      snackbarShowMessage(response.message ?? 'Account updated successfully', Severity.Success);
    }
  }

  function inputFileHandler(e: BaseSyntheticEvent) {
    console.log('changing file input', e.target.files);
    const file = e.target.files !== null && e?.target?.files[0];
    if (file === null) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverPhoto('' + e.target?.result);
      console.log(e.target?.result);
    };
    reader.onerror = () => {
      setUploadError('File upload error!!!');
    };
    reader.readAsDataURL(file);
  }

  return (
    <UploadFileContainer>
      <DragFileArea>
        <span style={{ fontSize: '50px' }}> file_upload </span>
        <h3
          className='dynamic-message'
          style={{
            fontSize: '26px',
            margin: '15px 0',
          }}
        >
          {' '}
          Drag & drop any file here{' '}
        </h3>
        <label
          style={{
            fontSize: '19px',
          }}
        >
          {' '}
          or{' '}
          <span
            style={{
              position: 'relative',
              top: '-22px',
              left: '-18px',
            }}
          >
            {' '}
            <input
              type='file'
              onChange={inputFileHandler}
              style={{
                opacity: 0,
              }}
            />{' '}
            <div>
              <span
                style={{
                  color: '#7b2cbf',
                  fontWeight: ' bolder',
                  cursor: 'pointer',
                  position: 'relative',
                  // width: '40px',
                  top: '0px',
                }}
              >
                browse file
              </span>{' '}
              <span>from device</span>{' '}
            </div>
            <Typography sx={{ color: 'green' }}>
              {coverPhoto !== null && 'File uploaded!! '}
            </Typography>
            <Typography sx={{ color: 'green' }}>
              {uploadError !== null && 'Something went wrong while uploading file. '}
            </Typography>
          </span>{' '}
        </label>
      </DragFileArea>
      {/* <CannotUploadMessage>
        {' '}
        <span style={{ paddingRight: '10px' }}>error</span> Please select a file first{' '}
        <span
          style={{ paddingRight: '10px', paddingLeft: '20px', cursor: 'pointer' }}
          className='material-icons-outlined cancel-alert-button'
        >
          cancel
        </span>{' '}
      </CannotUploadMessage> */}
      <FileBlock>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '15px',
          }}
        >
          {' '}
          <span
            style={{
              marginRight: '10px',
            }}
          >
            description
          </span>{' '}
          <span
            style={{
              padding: '0 3px',
            }}
          >
            {' '}
          </span>{' '}
          |{' '}
          <span
            style={{
              padding: '0 3px',
            }}
          >
            {' '}
          </span>{' '}
        </div>
        <span className='material-icons remove-file-icon'>delete</span>
        <ProgressBar />
      </FileBlock>
      <UploadButton onClick={uploadCoverPhotoHandler}>Upload</UploadButton>
    </UploadFileContainer>
  );
};

export default CommonFileInput;
