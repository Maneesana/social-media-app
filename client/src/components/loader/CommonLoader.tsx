import { Box, CircularProgress } from '@mui/material';

const CommonLoader = () => {
  return (
    <Box
      sx={{
        background: '#524e52',
        opacity: '0.5',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress sx={{ color: '#f2c7f1' }}></CircularProgress>
    </Box>
  );
};
export default CommonLoader;
