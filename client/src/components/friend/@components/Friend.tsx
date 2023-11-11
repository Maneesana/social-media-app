import { Avatar, Box, Typography } from '@mui/material';
import { ThinLine } from '../../../pages/userPages/userProfile/@components';
import { useNavigate } from 'react-router-dom';
interface IFriend {
  profileImage: string;
  username: string;
  email: string;
  userId: string;
  isChatMode?: boolean;
  chatHandler?: () => void;
}
const Friend = ({ profileImage, username, email, userId, isChatMode, chatHandler }: IFriend) => {
  const navigate = useNavigate();

  function viewFriendProfile() {
    if (userId === undefined || userId === null) return;
    if (typeof userId !== 'string' && userId === '') return;
    navigate('/profile/' + userId);
  }

  return (
    <Box
      onClick={() =>
        isChatMode ? chatHandler !== undefined && chatHandler() : viewFriendProfile()
      }
      sx={{ display: 'flex', cursor: 'pointer', flexDirection: 'row ', gap: '12px' }}
    >
      <Avatar src={profileImage || ' '} sx={{}}></Avatar>
      <Box>
        <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>{username || 'N/A'}</Typography>
        <Typography sx={{ opacity: '0.8', fontSize: '14px' }}>{email || 'N/A'}</Typography>
      </Box>
      <ThinLine />
    </Box>
  );
};

export default Friend;
