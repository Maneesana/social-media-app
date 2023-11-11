import { Box } from '@mui/material';
import PeopleMightKnow from '../../../../../components/friend/PeopleMightKnow';

const ProfileFriendsSection = () => {
  return (
    <Box
      sx={{
        flex: 3,

        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',

        gap: '20px',
      }}
    >
      <PeopleMightKnow />
      {/* <UserFriendList /> */}
    </Box>
  );
};

export default ProfileFriendsSection;
