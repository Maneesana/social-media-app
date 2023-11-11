import { styled } from '@mui/material/styles';

export const ThinLine = styled('div')(() => ({
  background: '#ebedeb',
  width: '90%',
  height: '0.6px',
  padding: '0.4px',
}));

export { default as TopCoverSection } from './TopCover/TopCoverSection';
export { default as AboutSection } from './AboutSection';
export { default as ProfileFriendsSection } from './ProfileFriendsSection';
