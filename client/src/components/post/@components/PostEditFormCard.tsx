/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { BaseSyntheticEvent, useContext, useState } from 'react';
import { Avatar, Box, Button, FormControl, OutlinedInput, Typography } from '@mui/material';
import { IconWrapper, WhiteLine } from '../../../pages/userPages/socialPage/@components/postFeed';
import { IUserPostData } from '../../../pages/userPages/socialPage/@components/postFeed/PostsFeed';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import axiosErrorHandler from '../../../config/axiosErrorHandler';
import { USER_POST_COMMON_URL } from '../../../services';
import { SnackbarContext } from '../../../context/SnackbarContext';
import { Severity } from '../../../enum';
import { IPost } from '..';

interface IPostEditFormCardProps extends IPost {
  postDataChangeHandler?: () => void;
}
const PostEditFormCard = ({
  authorId,
  avatarImage,
  authorName,
  publishedDate,
  description,
  postImage,
  comments,
  postId,
  likes,
  postDataChangeHandler,
}: IPostEditFormCardProps) => {
  const { snackbarShowMessage } = useContext(SnackbarContext);

  const [userPostData, setUserPostData] = useState<IUserPostData>({
    userId: authorId || '',
    authorImage: avatarImage || '',
    authorName: authorName || '',
    comments: !Array.isArray(comments) ? [] : comments,
    likes: likes || 0,
    postImage: postImage || '',
    description: description || '',
  } as IUserPostData);

  function uploadPostImageHandler(e: BaseSyntheticEvent) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setUserPostData((prev) => ({ ...prev, postImage: '' + event?.target?.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function resetPostData() {
    setUserPostData({
      userId: '',
      authorImage: '',
      authorName: '',
      comments: [],
      likes: 0,
      postImage: '',
      description: '',
      _id: '',
    });
  }
  async function sharePostHandler() {
    if (userPostData.postImage === null || userPostData.description.length === 0) return;
    const response = await axiosErrorHandler({
      endpoint: USER_POST_COMMON_URL + '/update',
      methodType: 'PUT',
      snackbarShowMessage,
      payload: {
        postId,
        description: userPostData.description,
        postImage: userPostData.postImage,
      },
    });

    if (response) {
      snackbarShowMessage(response.message ?? 'Post updated successfully ', Severity.Success);
      postDataChangeHandler !== undefined && postDataChangeHandler();
    }
    resetPostData();
  }

  return (
    <Box
      sx={{
        width: '95%',

        borderRadius: '14px',
        background: '#ebf2ef',
        padding: '1rem',
        boxShadow: '3px 8px 7px -4px #2B2323',
        marginBottom: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          padding: '12px',
        }}
      >
        <Avatar alt='user profile logo' src={userPostData.authorImage ?? ' '} />
        <OutlinedInput
          placeholder="What's in your mind?"
          multiline
          minRows={2}
          value={userPostData.description}
          onChange={(e) => {
            setUserPostData({ ...userPostData, description: e.target.value });
          }}
          sx={{
            flex: 1,
            padding: '10px',
            background: '#fff',
            marginBottom: '2px',
          }}
        ></OutlinedInput>
      </Box>
      {userPostData.postImage && (
        <img
          src={userPostData.postImage}
          style={{
            display: 'block',
            objectFit: 'contain',
            width: '500px',
            height: '256px',
            backgroundColor: '#7A9DB7',
            borderRadius: '8px',
            margin: 'auto',
            marginBottom: '12px',
          }}
          alt=''
        />
      )}

      <WhiteLine />

      <Box
        sx={{
          display: 'flex',
          marginTop: '20px',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        <IconWrapper>
          <FormControl sx={{ cursor: 'pointer', position: 'relative', padding: '20px' }}>
            <input
              style={{
                width: '140px',
                cursor: 'pointer',
                paddingRight: '',
                opacity: 0,
                position: 'absolute',
                backgroundColor: 'red',
              }}
              type='file'
              onChange={uploadPostImageHandler}
            ></input>
            <Box
              sx={{
                display: 'flex',
                gap: '12px',

                alignItems: 'center',
              }}
            >
              <InsertPhotoIcon
                sx={{
                  color: '#129acc',
                }}
              />

              <Typography sx={{}}>Photo or video</Typography>
            </Box>
          </FormControl>
        </IconWrapper>

        <IconWrapper>
          <LabelIcon
            sx={{
              color: '#1ed4ac',
            }}
          />
          <Typography> Tag</Typography>
        </IconWrapper>
        <IconWrapper>
          <LocationOnIcon
            sx={{
              color: '#12cc12',
            }}
          />
          <Typography> Location</Typography>
        </IconWrapper>
        <IconWrapper>
          <EmojiEmotionsIcon
            sx={{
              color: '#731135',
            }}
          />
          <Typography> Feelings</Typography>
        </IconWrapper>
        {(userPostData.description !== '' || userPostData.postImage !== '') && (
          <Button
            sx={{ height: '35px', alignSelf: 'center' }}
            color='error'
            variant='contained'
            onClick={() => resetPostData()}
          >
            Cancel
          </Button>
        )}
        <Button sx={{ alignSelf: 'center' }} onClick={sharePostHandler} variant='contained'>
          Share
        </Button>
      </Box>
    </Box>
  );
};

export default PostEditFormCard;
