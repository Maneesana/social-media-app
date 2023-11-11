import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsFeed from './@components/postFeed/PostsFeed';
import SideBar from './@components/newsFeed/SideBar';
import { AuthContext } from '../../../context';
import { Box } from '@mui/material';
import { CommonLoader } from '../../../components/loader';

const index = () => {
  const navigate = useNavigate();
  const [isUserLogFirstTime, setIsUserLogFirstTime] = useState<boolean>(true);
  const { isFirstTimeUser, userProfile } = useContext(AuthContext);

  useEffect(() => {
    userProfile.userId !== undefined &&
      isFirstTimeUser(userProfile.userId).then((res) => {
        if (res === true) {
          setIsUserLogFirstTime(true);
          navigate('/profileDetails');
        } else {
          setIsUserLogFirstTime(false);
        }
      });
  }, [userProfile]);
  return (
    <>
      {isUserLogFirstTime ? (
        <CommonLoader />
      ) : (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <SideBar />
          <PostsFeed />
        </Box>
      )}
    </>
  );
};

export default index;
