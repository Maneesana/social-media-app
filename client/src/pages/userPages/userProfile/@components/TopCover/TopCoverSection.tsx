import { Box, Typography, Avatar } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context';
import { useParams } from 'react-router-dom';
import SelfProfileViewSection from './@components/SelfProfileViewSection';
import OthersProfileViewSection from './@components/OthersProfileViewSection';

interface ITopCoverSectionProps {
  username: string;
  profilePhoto: string;
  coverPhoto: string;
  // eslint-disable-next-line no-unused-vars
}

const TopCoverSection = ({ username, profilePhoto, coverPhoto }: ITopCoverSectionProps) => {
  const { userProfile } = useContext(AuthContext);
  const { userParamId } = useParams();

  return (
    <Box
      sx={{
        background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF), #C4C4C4',
        width: '1200px',
        height: '403px',
        borderRadius: '10px',
        marginTop: '2rem',
        margin: 'auto',
        position: 'relative',
      }}
    >
      <img alt='profile' src={coverPhoto} style={{ width: '100%', height: '280px' }} />
      {/* <Box
        sx={{ background: '#c0d2f0', width: '100%', height: '280px', borderRadius: '5px' }}
      ></Box> */}
      <Box
        sx={{
          width: '1200px',
          height: '123px',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '137px',
            left: '60.34px',
            width: '397.71px',
            height: '237px',
            display: 'flex',
          }}
        >
          <Avatar
            src={profilePhoto}
            sx={{ width: '179.82px', height: '179.82px', alignSelf: 'flex-start' }}
          ></Avatar>

          <Box sx={{ color: '#A303A0', fontFamily: 'Nunito', alignSelf: 'flex-end' }}>
            <Typography sx={{ fontSize: '30px', fontWeight: '700' }}>
              {username ?? 'N/A'}
            </Typography>
            {/* <Typography sx={{ fontSize: '16px', fontWeight: '400', opacity: '0.7' }}>
              {' '}
              Front-end developer
            </Typography> */}
          </Box>
        </Box>
        {userProfile.userId === userParamId ? (
          <SelfProfileViewSection />
        ) : (
          <OthersProfileViewSection userId={userParamId || ' '} />
        )}
      </Box>
    </Box>
  );
};

export default TopCoverSection;
