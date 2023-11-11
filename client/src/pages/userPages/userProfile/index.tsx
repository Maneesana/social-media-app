import { Box } from '@mui/material';
import { TopCoverSection, AboutSection, ProfileFriendsSection } from './@components';

import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../../../context';
import axiosErrorHandler from '../../../config/axiosErrorHandler';
import { SnackbarContext } from '../../../context/SnackbarContext';
import { USER_POST_COMMON_URL, USER_ROUTES_COMMON_URL } from '../../../services';
import { IUserPostData } from '../socialPage/@components/postFeed/PostsFeed';
import { CommonLoader } from '../../../components/loader';
import { useParams } from 'react-router-dom';
import ProfileTabs from './@components/ProfileTabs/ProfileTabs';

interface IUserProfileData {
  address: string;
  coverPhoto: string;
  createdAt: string;
  dateOfBirth: string | null | Date;
  email: string;
  followers: Array<string>;
  followingUsers: Array<string>;
  gender: string;
  phone: number;
  profilePhoto: string;
  username: string;
  [key: string]: any;
}

const UserProfilePage = () => {
  const { userProfile, logout } = useContext(AuthContext);
  const { snackbarShowMessage } = useContext(SnackbarContext);
  const [posts, setPosts] = useState<IUserPostData[]>([] as IUserPostData[]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAPostDataChange, setIsAPostDataChange] = useState(false);
  const { userParamId } = useParams();

  const userProfileData: IUserProfileData = useMemo(() => {
    return {} as IUserProfileData;
  }, []);

  async function getUserProfileData() {
    if (userProfile.userId === undefined) return;

    const param = userParamId === 'me' ? userProfile.userId : userParamId;
    const response = await axiosErrorHandler({
      endpoint: USER_ROUTES_COMMON_URL + param,
      methodType: 'GET',
      snackbarShowMessage,
    });
    if (response) {
      Object.entries(response).forEach(([key, value]) => {
        userProfileData[key] = value;
      });

      setIsLoading(false);
    }
  }

  function postDataChangeHandler() {
    setIsAPostDataChange((prev) => !prev);
  }
  async function getAllPosts() {
    const param = userParamId === 'me' ? userProfile.userId : userParamId;
    if (userProfile.userId === undefined) return;
    const response = await axiosErrorHandler({
      endpoint: USER_POST_COMMON_URL + '/all/' + param,
      methodType: 'GET',
      snackbarShowMessage,
      logout,
    });

    if (response) {
      setPosts(response.posts);
    }
  }

  useEffect(() => {
    getUserProfileData();
    getAllPosts();
  }, [userProfile, isAPostDataChange]);

  return (
    <>
      {!isLoading ? (
        <>
          {Object.keys(userProfileData).length > 0 && (
            <Box sx={{ background: '#F7F7F8', height: '100vh' }}>
              <TopCoverSection
                username={userProfileData.username}
                profilePhoto={userProfileData.profilePhoto}
                coverPhoto={userProfileData.coverPhoto}
              />

              <Box
                sx={{
                  display: 'flex',
                  width: '1200px',

                  borderRadius: '10px',
                  marginTop: '3rem',
                  margin: 'auto',
                }}
              >
                <AboutSection
                  gender={userProfileData.gender}
                  dateOfBirth={userProfileData.dateOfBirth}
                  address={userProfileData.address}
                  email={userProfileData.email}
                  phone={userProfileData.phone}
                />
                <Box
                  sx={{
                    flex: 7,
                    background: '#fff',
                    width: '600px',
                    height: '979px',
                    borderRadius: '10px',
                  }}
                >
                  <ProfileTabs
                    postDataChangeHandler={postDataChangeHandler}
                    posts={posts}
                    followers={userProfileData.followers}
                    followings={userProfileData.followingUsers}
                  />
                </Box>
                <ProfileFriendsSection />
              </Box>
            </Box>
          )}
        </>
      ) : (
        <CommonLoader />
      )}
    </>
  );
};

export default UserProfilePage;
