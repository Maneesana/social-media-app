import { Box, Skeleton } from '@mui/material';

const SkeletonLoader = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Skeleton
        variant='rectangular'
        sx={{ marginBottom: '8px', marginTop: '20px', borderRadius: '6px' }}
        width='95%'
        height='70px'
      />
      <Skeleton
        variant='rectangular'
        sx={{ marginBottom: '10px', borderRadius: '6px' }}
        width='95%'
        height={500}
      />
      <Skeleton
        variant='rectangular'
        sx={{ marginBottom: '8px', borderRadius: '6px' }}
        width='95%'
        height='40px'
      />
    </Box>
  );
};

export default SkeletonLoader;
