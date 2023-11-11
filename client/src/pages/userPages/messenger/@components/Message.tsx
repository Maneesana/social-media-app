import { Typography, Box, Avatar } from '@mui/material';
interface IMessageProp {
  me?: boolean;
  userMsg: string;
}
const Message = ({ me, userMsg }: IMessageProp) => {
  return (
    <>
      <Box
        sx={{
          marginBottom: '15px',
          display: 'flex',

          //   justifyContent: 'flex-end',
          justifyContent: me ? 'flex-end' : 'flex-start',
        }}
      >
        <Box
          sx={{
            marginBottom: '15px',
            display: 'flex',
            padding: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
              flex: '',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
              }}
            >
              <Avatar alt='display picture' />
              <Box
                sx={{
                  backgroundColor: me ? '#d2f0f7' : '#2d98c2',
                  color: '',
                  marginTop: '12px',
                  minWidth: '55px',
                  padding: '10px',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontSize: '18px' }} variant='h5'>
                  {userMsg}
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: '12px' }} variant='h6'>
              One hour ago
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Message;
