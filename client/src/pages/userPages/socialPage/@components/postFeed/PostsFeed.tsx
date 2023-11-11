import { Avatar, Box, Button, FormControl, OutlinedInput, Typography } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { IconWrapper, WhiteLine, Wrapper } from '.';
import { Post } from '../../../../../components';
import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../context';
import axiosErrorHandler from '../../../../../config/axiosErrorHandler';
import { SnackbarContext } from '../../../../../context/SnackbarContext';
import { USER_POST_COMMON_URL } from '../../../../../services';
import { Severity } from '../../../../../enum';
import { SkeletonLoader } from '../../../../../components/loader';

export interface IUserPostData {
  _id: string;
  authorImage: string;
  description: string;
  authorName: string;
  postImage: string | null;
  likes: number;
  comments: [];
  userId: string;
  publishedDate?: Date | string;
}

const PostsFeed = () => {
  const { userProfile } = useContext(AuthContext);
  const { snackbarShowMessage } = useContext(SnackbarContext);
  const [userPostCreateCount, setUserPostCreateCount] = useState(0);

  const [posts, setPosts] = useState<IUserPostData[]>([] as IUserPostData[]);

  const [userPostData, setUserPostData] = useState<IUserPostData>({
    userId: userProfile.userId,
    authorImage: userProfile.profilePhoto,
    authorName: userProfile.username,
    comments: [],
    likes: 0,
    postImage: null,
    description: '',
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
  async function sharePostHandler() {
    if (userPostData.postImage === null || userPostData.description.length === 0) return;
    const response = await axiosErrorHandler({
      endpoint: USER_POST_COMMON_URL,
      methodType: 'POST',
      snackbarShowMessage,
      payload: userPostData,
    });

    if (response) {
      setUserPostCreateCount((prev) => prev + 1);
      snackbarShowMessage('Your post has been created successfully', Severity.Success);
    }
    resetUserPostData();
  }

  async function getAllPosts() {
    const userIds = [...userProfile.followers, ...userProfile.followingUsers, userProfile.userId];
    const allPosts: IUserPostData[] = [];
    let responseData;

    for (let i = 0; i < userIds.length; i++) {
      responseData = await axiosErrorHandler({
        endpoint: USER_POST_COMMON_URL + '/all/' + userIds[i],
        methodType: 'GET',
        snackbarShowMessage,
      });
      allPosts.push(responseData.posts);
      if (i === userIds.length - 1) {
        setPosts(allPosts.flat());
      }
    }
  }
  function resetUserPostData() {
    setUserPostData({
      userId: '',
      authorImage: '',
      authorName: '',
      comments: [],
      likes: 0,
      postImage: null,
      description: '',
      _id: '',
    });
  }

  useEffect(() => {
    getAllPosts();
  }, [userPostCreateCount]);

  return (
    <Wrapper>
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
          <Avatar alt='user profile logo' src={userProfile.profilePhoto ?? ' '} />
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
        {userPostData.postImage !== null && (
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
          {(userPostData.description !== '' || userPostData.postImage !== null) && (
            <Button
              sx={{ height: '35px', alignSelf: 'center' }}
              color='error'
              variant='contained'
              onClick={() => resetUserPostData()}
            >
              Cancel
            </Button>
          )}
          <Button sx={{ alignSelf: 'center' }} onClick={sharePostHandler} variant='contained'>
            Share
          </Button>
        </Box>
      </Box>
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <Post
              key={crypto.randomUUID()}
              postId={post._id}
              authorId={post.userId}
              avatarImage={post.authorImage}
              description={post.description}
              authorName={post.authorName}
              postImage={post.postImage ?? ''}
              publishedDate={post.publishedDate ?? ''}
              likes={post.likes}
              comments={post.comments}
            />
          );
        })
      ) : (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      )}
    </Wrapper>
  );
};

export default PostsFeed;
