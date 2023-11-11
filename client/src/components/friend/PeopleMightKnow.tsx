import { Box, CircularProgress, Typography } from '@mui/material';
import Friend from './@components/Friend';
import { useContext, useEffect, useState } from 'react';
import axiosErrorHandler from '../../config/axiosErrorHandler';
import { USER_FRIENDS_URL } from '../../services';
import { SnackbarContext } from '../../context/SnackbarContext';
import { AuthContext } from '../../context';

interface IFriend {
  userId: string;
  profilePhoto: string;
  email: string;
  username: string;
}

const PeopleMightKnow = () => {
  const { snackbarShowMessage } = useContext(SnackbarContext);
  const { logout, userProfile } = useContext(AuthContext);
  const [possibleFriends, setPossibleFriends] = useState<IFriend[]>([] as IFriend[]);
  async function getPossibleFriends() {
    const response = await axiosErrorHandler({
      endpoint: USER_FRIENDS_URL + '/' + userProfile.userId,
      methodType: 'GET',
      snackbarShowMessage,
      logout,
    });
    if (response) {
      setPossibleFriends([...response.users]);
    }
  }

  useEffect(() => {
    getPossibleFriends();
  }, []);
  return (
    <Box
      sx={{
        width: '260px',
        height: '234px',
        background: '#fff',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        // alignItems: 'flex-start',
        alignItems: 'center',

        paddingTop: '10px',
        paddingLeft: '15px',
        color: '#490057',
        overflowY: 'scroll',
      }}
    >
      <Typography sx={{ fontWeight: '800', fontSize: '20px' }}>People You might know</Typography>
      {possibleFriends?.length > 0 ? (
        possibleFriends.map((friend) => {
          return (
            <Friend
              key={crypto.randomUUID()}
              profileImage={friend.profilePhoto}
              username={friend.username}
              email={friend.email}
              userId={friend.userId}
            />
          );
        })
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default PeopleMightKnow;
