import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { AuthContext } from '../../../context';
import { calculateDateAgo } from '../../../utils';
interface ICommentProps {
  authorId: string;
  content: string;
  authorProfileImage: string;
  publishedDate: Date | string;
}

const CommentItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  padding: '5px',
  marginBottom: '12px',
  alignSelf: 'start',
}));
const CommentItemBySelf = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  padding: '5px',
  marginBottom: '12px',
  alignSelf: 'end',
}));

const Comment = ({ authorId, content, authorProfileImage, publishedDate }: ICommentProps) => {
  const { userProfile } = useContext(AuthContext);

  if (authorId === userProfile.userId) {
    return (
      <CommentItemBySelf>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          {' '}
          <Typography
            sx={{
              border: '0.4px solid #A303A0',
              padding: '10px',
              borderRadius: '10px',
              maxHeight: '400px',
            }}
          >
            {content || 'N/A'}
          </Typography>
          <Typography>{calculateDateAgo(publishedDate)}</Typography>
        </Box>
        <Avatar src={authorProfileImage || ' '} />
      </CommentItemBySelf>
    );
  }
  return (
    <CommentItem>
      <Avatar src={authorProfileImage || 'N/A'} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        <Typography sx={{ border: '0.4px solid #A303A0', padding: '10px', borderRadius: '10px' }}>
          {content || 'N/A'}
        </Typography>
        <Typography>{calculateDateAgo(publishedDate)} ago</Typography>
      </Box>
    </CommentItem>
  );
};

export default Comment;
