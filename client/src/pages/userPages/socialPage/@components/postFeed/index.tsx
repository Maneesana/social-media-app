import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)(() => ({
  backgroundColor: '#cbf7e3',
  padding: '1rem',
  flex: 3,
}));

export const WhiteLine = styled('div')(() => ({
  height: '4px',
  borderRadius: '5px',

  background: '#d4cbd2',
}));

export const IconWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
}));
