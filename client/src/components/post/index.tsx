import { Stack, Box, Avatar, Typography, styled, OutlinedInput, Button } from '@mui/material';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { SnackbarContext } from '../../context/SnackbarContext';
import { AuthContext } from '../../context';
import axiosErrorHandler from '../../config/axiosErrorHandler';
import { USER_POST_COMMON_URL } from '../../services';
import Comment from './@components/Comment';
import PostPopOver from './@components/PostPopOver';
import CommonModal from '../modal';
import PostEditFormCard from './@components/PostEditFormCard';
import { Severity } from '../../enum';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
type Comment = {
  authorId: string;
  authorProfileImage: string;
  publishedDate: Date | string;
  content: string;
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export interface IPost {
  avatarImage: string;
  authorName: string;
  postImage: string;
  description: string;
  publishedDate: Date | string;
  likes: number;
  authorId: string;
  postId: string;
  comments: Comment[];
  postDataChangeHandler?: () => void;
}
const LineBar = styled('div')(() => ({
  background: '#E5E5E5',
  width: '90%',
  height: '0.2px',
  padding: '0.1px',
}));

const CommentWrapper = styled(Box)(() => ({
  maxWidth: '400px',
  height: '300px',
  minWidth: '300px',
  maxHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '0px',
  border: '1px solid #A303A0',
  padding: '10px',
  paddingTop: '25px',

  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    width: '4px',
  },
  '::-webkit-scrollbar-track': {
    background: '#ddeded',
  },
  '::-webkit-scrollbar-thumb': {
    background: '#8d9494',
    borderRadius: '5px',
  },
}));

export default function Post({
  avatarImage,
  authorName,
  postImage,
  description,
  publishedDate,
  likes,
  authorId,
  comments,
  postId,
  postDataChangeHandler,
}: IPost) {
  const { snackbarShowMessage } = useContext(SnackbarContext);
  const { logout, userProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postLikes, setPostLikes] = useState<number>(likes);
  const [commentContent, setCommentContent] = useState<string>('');
  const [postComments, setPostComments] = useState(comments);
  const [isPostCommentOpen, setIsPostCommentOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function postLikeHandler() {
    const responseData = await axiosErrorHandler({
      endpoint: USER_POST_COMMON_URL + '/like',
      methodType: 'PUT',
      payload: { postId },
      snackbarShowMessage,
      logout,
    });
    if (responseData) {
      setPostLikes((prev) => prev + 1);
    }
  }
  async function postCommentHandler() {
    if (commentContent === '') return;

    const commentData = {
      postId,
      comment: {
        authorProfileImage: userProfile.profilePhoto,
        authorId: userProfile.userId,
        content: commentContent,
        publishedDate: new Date(),
      },
    };
    const responseData = await axiosErrorHandler({
      endpoint: USER_POST_COMMON_URL + '/updateComment',
      methodType: 'PUT',
      payload: commentData,
      snackbarShowMessage,
      logout,
    });
    if (responseData) {
      setPostComments((prev) => [...prev, commentData.comment]);
    }

    setCommentContent('');
  }

  function popOverHandleClose() {
    setAnchorEl(null);
  }

  function postPopOverHandler(event: React.MouseEvent<SVGSVGElement>) {
    setAnchorEl(event.currentTarget);
  }

  async function deletePost() {
    const respone = await axiosErrorHandler({
      endpoint: USER_POST_COMMON_URL + '/delete/' + postId,
      methodType: 'DELETE',
      snackbarShowMessage,
      logout,
    });
    if (respone) {
      snackbarShowMessage(respone.message ?? 'Post has been deleted', Severity.Success);
      postDataChangeHandler !== undefined && postDataChangeHandler();
    }
  }
  async function postUpdateHandler(postActionType: 'update' | 'delete') {
    if (postActionType !== 'delete' && postActionType !== 'update') return;
    if (postActionType === 'update') setIsModalOpen(true);
    if (postActionType === 'delete') deletePost();
  }
  return (
    <Stack
      direction='column'
      spacing={{ xs: 1, sm: 2, md: 4 }}
      sx={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        marginTop: '5px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '12px',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            width: '100%',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ width: '80px', height: '80px' }} alt='user logo' src={avatarImage || ''} />
          <Box
            onClick={() => {
              navigate('/profile/' + authorId);
            }}
            sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
          >
            <Typography sx={{ fontSize: '15px', color: '#490057', fontWeight: '600' }}>
              {authorName || 'N/A'}
            </Typography>
            <Typography
              sx={{ fontSize: '11px', lineHeight: '13.64px', color: '#A303A0', fontWeight: '300' }}
            >
              {'' + new Intl.DateTimeFormat('en-IN').format(new Date(publishedDate))}
            </Typography>
          </Box>
        </Box>
        {authorId === userProfile.userId && (
          <MoreVertSharpIcon
            onClick={postPopOverHandler}
            sx={{
              cursor: 'pointer',
            }}
          />
        )}
        <PostPopOver handleClose={popOverHandleClose} anchorEl={anchorEl}>
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
            <Button onClick={() => postUpdateHandler('update')}>Edit Post</Button>
            <Button onClick={() => postUpdateHandler('delete')}>Delete Post</Button>
          </Box>
        </PostPopOver>

        {isModalOpen && (
          <CommonModal
            isModalOpen={isModalOpen}
            modalHandler={(actionType) => {
              if (actionType === 'close') setIsModalOpen(false);
            }}
          >
            <PostEditFormCard
              postDataChangeHandler={postDataChangeHandler}
              postImage={postImage}
              authorId={authorId}
              avatarImage={avatarImage}
              authorName={authorName}
              description={description}
              publishedDate={publishedDate}
              likes={likes}
              postId={postId}
              comments={comments}
            />
          </CommonModal>
        )}
      </Box>
      <Box>
        <Typography sx={{ marginBottom: '12px', color: '#490057' }}>
          {description || 'N/A'}
        </Typography>
        {/* <Box
          sx={{ width: '481px', height: '256px', backgroundColor: '#7A9DB7', borderRadius: '8px' }}
        ></Box> */}
        {postImage && (
          <img
            src={postImage}
            style={{ objectFit: 'contain' }}
            width='620px'
            height='500px'
            alt='postImage'
          />
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box onClick={postLikeHandler} sx={{ display: 'flex', gap: '1.4px', cursor: 'pointer' }}>
          <FavoriteBorderIcon sx={{ color: '#A303A0' }} />
          <Typography sx={{ color: '#490057', fontWeight: '600' }}>{postLikes} </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1.4px', cursor: 'pointer' }}>
          <ChatBubbleOutlineIcon
            onClick={() => {
              setIsPostCommentOpen((prev) => !prev);
            }}
            sx={{ color: '#A303A0' }}
          />
          <Typography sx={{ color: '#490057', fontWeight: '600' }}>
            {postComments?.length || '0'}
          </Typography>
        </Box>
        {isPostCommentOpen && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            {postComments.length > 0 && (
              <CommentWrapper>
                {postComments.map((comment) => (
                  <Comment
                    key={crypto.randomUUID()}
                    authorId={comment.authorId}
                    authorProfileImage={comment.authorProfileImage}
                    content={comment.content}
                    publishedDate={comment.publishedDate}
                  />
                ))}
              </CommentWrapper>
            )}
            <Box sx={{}}>
              <OutlinedInput
                value={commentContent}
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
              />
              <Button
                onClick={postCommentHandler}
                sx={{
                  marginLeft: '5px',
                  background: '#A303A0',
                  color: '#fff',
                  ':hover': {
                    background: '#fff',
                    border: '0.6px solid #A303A0',
                    color: '#A303A0',
                  },
                }}
              >
                Reply
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <LineBar />
    </Stack>
  );
}
