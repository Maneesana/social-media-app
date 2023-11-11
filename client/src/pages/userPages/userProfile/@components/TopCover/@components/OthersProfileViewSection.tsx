import { Box, Button, Stack } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useContext, useState } from 'react';
import { SnackbarContext } from '../../../../../../context/SnackbarContext';
import { AuthContext } from '../../../../../../context';
import axiosErrorHandler from '../../../../../../config/axiosErrorHandler';
import { USER_ROUTES_COMMON_URL } from '../../../../../../services';
import { Severity } from '../../../../../../enum';
interface IOthersProfileViewSection {
  userId: string;
}
const OthersProfileViewSection = ({ userId }: IOthersProfileViewSection) => {
  const { userProfile } = useContext(AuthContext);
  const { snackbarShowMessage } = useContext(SnackbarContext);
  const { logout } = useContext(AuthContext);
  const [followUnfollow, setFollowUnfollow] = useState<'follow' | 'unfollow'>(
    userProfile.followingUsers.includes(userId) ? 'unfollow' : 'follow',
  );

  async function followOrUnfollowUser(action: 'follow' | 'unfollow') {
    if (action !== 'follow' && action !== 'unfollow') return;
    const responseData = await axiosErrorHandler({
      endpoint: USER_ROUTES_COMMON_URL + userId + '/' + action,
      methodType: 'PUT',
      payload: { userId: userProfile.userId },
      snackbarShowMessage,
      logout,
    });
    if (responseData) {
      snackbarShowMessage(responseData?.message || 'success', Severity.Success);
    }
  }

  return (
    <Stack
      sx={{
        position: 'absolute',
        right: '35px',
        top: '330px',
      }}
      direction='row'
      spacing={3}
    >
      <Box
        sx={{
          background: '#A303A0',
          width: '46px',
          height: '46px',
          padding: '1px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ChatBubbleOutlineIcon sx={{ color: '#fff' }} />
      </Box>

      <Button
        onClick={() => {
          followOrUnfollowUser(followUnfollow);
          if (followUnfollow === 'follow') {
            setFollowUnfollow('unfollow');
          } else {
            setFollowUnfollow('follow');
          }
        }}
        sx={{
          width: '172px',
          height: '44.67px',
          textTransform: 'capitalize',
          borderRadius: '10px',
          backgroundColor: '#A303A0',
          color: '#FFF',
          ':hover': {
            background: '#FFF',
            color: '#A303A0',
            border: '1px solid #A303A0',
          },
        }}
      >
        {followUnfollow}
      </Button>
      <Button
        sx={{
          width: '172px',
          height: '44.67px',
          textTransform: 'capitalize',
          borderRadius: '10px',
          backgroundColor: '#FFF',
          color: '#A303A0',
          border: '1px solid #A303A0 ',
          ':hover': {
            background: '#A303A0',
            color: '#FFF',
          },
        }}
      >
        Schedule a meeting
      </Button>
    </Stack>
  );
};

export default OthersProfileViewSection;
