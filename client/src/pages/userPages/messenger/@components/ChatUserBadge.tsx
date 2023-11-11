import { Avatar, Box, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

interface IChatUserBadge {
  online?: boolean;
  chatUserName?: string;
  avatarPhoto: string;
  onClick?: () => void;
}
const OnlineBadgeWrapper = styled('div')(() => ({
  position: 'absolute',
  left: '70px',
  top: '40px',
  display: 'flex',
  gap: 2,
  alignItems: 'center',
}));
const OnlineBadge = styled('div')(() => ({
  padding: '3.5px',
  borderRadius: '50%',
  width: '2px',
  height: '2px',
  backgroundColor: '#05b531',
  marginRight: '3px',
}));

const ChatUserBadge = ({ online, chatUserName, onClick, avatarPhoto }: IChatUserBadge) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        gap: '15px',
        marginTop: '20px',
        alignItems: 'center',
        position: 'relative',
        borderRadius: '12px',

        backgroundColor: '#f2f7f7',

        padding: '15px',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#daf7f7',
        },
      }}
    >
      {online && (
        <OnlineBadgeWrapper>
          <OnlineBadge></OnlineBadge>
          <Typography sx={{ fontSize: '13px' }}>Online</Typography>
        </OnlineBadgeWrapper>
      )}
      <Avatar
        variant={online ? 'circular' : 'rounded'}
        sx={{ bgcolor: deepPurple[500] }}
        src={avatarPhoto}
        alt='display photo'
      >
        MN
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 'bold', marginBottom: '13px' }}>
            {chatUserName || 'Full name'}{' '}
          </Typography>
          {!online && <Typography>12m</Typography>}
        </Box>
        {!online && <Typography sx={{ color: '#8a8780' }}>Haha</Typography>}
      </Box>
    </Box>
  );
};

export default ChatUserBadge;
