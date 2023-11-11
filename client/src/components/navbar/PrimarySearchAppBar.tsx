import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../../context';
// eslint-disable-next-line no-duplicate-imports, import/no-duplicates
import { NavLink } from './@components';

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const { logout, userProfile } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  function signOutHandler() {
    logout();
  }
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const userProfileClickHandler = () => {
    navigate('/profile/' + userProfile.userId);
    handleMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={userProfileClickHandler}>Profile</MenuItem>
      <MenuItem onClick={signOutHandler}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <Typography>Profile</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            background:
              'linear-gradient(90deg, rgba(174,218,222,0.6110819327731092) 41%, rgba(234,197,236,0.7455357142857143) 85%)',
          }}
          position='static'
        >
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{
                display: { xs: 'none', sm: 'block' },
                cursor: 'pointer',
                color: '#A303A0',
                fontWeight: '600',
                fontSize: '23px',
                fontFamily: 'sans-serif',
                letterSpacing: '0.7px',
              }}
            >
              SocialApp
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ marginRight: 5 }}>
              <Typography
                variant='h6'
                component='div'
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                <NavLink
                  sx={{
                    cursor: 'pointer',
                    color: '#A303A0',
                    fontWeight: '600',
                    fontSize: '23px',
                    fontFamily: 'sans-serif',
                    letterSpacing: '0.7px',
                  }}
                  to='/'
                >
                  Homepage
                </NavLink>
                <NavLink
                  sx={{
                    cursor: 'pointer',
                    color: '#A303A0',
                    fontWeight: '600',
                    fontSize: '23px',
                    fontFamily: 'sans-serif',
                    letterSpacing: '0.7px',
                  }}
                  to='/messenger'
                >
                  Chat Now
                </NavLink>
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='secondary'
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
}
