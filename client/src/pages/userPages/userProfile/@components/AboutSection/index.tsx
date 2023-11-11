import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeIcon from '@mui/icons-material/Cake';
import { ThinLine } from '..';

interface IAboutSectionProps {
  gender: string;
  dateOfBirth: string | Date | null;
  address: string;
  email: string;
  phone: number;
}

const AboutSection = ({ gender, dateOfBirth, address, email, phone }: IAboutSectionProps) => {
  return (
    <Box
      sx={{
        width: '260px',
        height: '399px',
        backgroundColor: '#fff',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          paddingLeft: '20px',
          paddingTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '12px',
          color: '#804D89',
        }}
      >
        <Typography
          sx={{ color: '#A303A0', fontSize: '16px', fontWeight: '800', textAlign: 'left' }}
        >
          About
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <PersonIcon />
          <Typography> {gender || 'N/A'}</Typography>
        </Box>
        <ThinLine />

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <CakeIcon />
          <Typography>
            Born on{' '}
            {typeof dateOfBirth !== null
              ? new Date(dateOfBirth as Date | string).toDateString()
              : 'N/A'}
          </Typography>
        </Box>

        <ThinLine />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <LocationOnIcon />
          <Typography>{address || 'N/A'}</Typography>
        </Box>
        <ThinLine />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <EmailIcon sx={{ marginTop: 'px' }} />
          <Typography> {email || 'N/A'}</Typography>
        </Box>

        <ThinLine />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <PhoneIcon />
          <Typography>{phone || 'N/A'}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutSection;
