import { Tabs, Tab, Typography } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import TabPanel from './TabPanel';
import { ThinLine } from '..';
import { IUserPostData } from '../../../socialPage/@components/postFeed/PostsFeed';
import { Post } from '../../../../../components';
import axiosErrorHandler from '../../../../../config/axiosErrorHandler';
import { USER_ROUTES_COMMON_URL } from '../../../../../services';
import { SnackbarContext } from '../../../../../context/SnackbarContext';
import { AuthContext } from '../../../../../context';
import Friend from '../../../../../components/friend/@components/Friend';
import { useParams } from 'react-router-dom';
interface IPosts {
  posts: IUserPostData[];
  followings: string[];
  followers: string[];
  postDataChangeHandler?: () => void;
}
export type TFriend = {
  profilePhoto: string;
  username: string;
  email: string;
  userId: string;
};

const ProfileTabs = ({ posts, followings, followers, postDataChangeHandler }: IPosts) => {
  const { userParamId } = useParams();
  const { snackbarShowMessage } = useContext(SnackbarContext);
  const { logout } = useContext(AuthContext);
  const [currentTab, setCurrentTab] = useState<'followers' | 'followings' | 'posts'>('posts');
  const [userFollowers, setUserFollowers] = useState<TFriend[]>([] as TFriend[]);
  const [userFollowingUsers, setUserFollowingUsers] = useState<TFriend[]>([] as TFriend[]);

  async function getFollowersAndFollowingData() {
    const tempFollowers = [];
    // const tempHashMapFolowers={}
    const tempFollowings = [];
    if (followers.length === 0) {
      setUserFollowers([]);
    } else {
      for (let i = 0; i < followers.length; i++) {
        const response = await axiosErrorHandler({
          endpoint: USER_ROUTES_COMMON_URL + followers[i],
          methodType: 'GET',
          snackbarShowMessage,
          logout,
        });

        if (response) {
          const { profilePhoto, username, email, _id } = response;
          tempFollowers.push({
            profilePhoto,
            username,
            email,
            userId: _id,
          });
        }
      }
      setUserFollowers([...tempFollowers]);
    }
    if (followings.length === 0) {
      setUserFollowingUsers([]);
    } else {
      for (let i = 0; i < followings.length; i++) {
        const response = await axiosErrorHandler({
          endpoint: USER_ROUTES_COMMON_URL + followings[i],
          methodType: 'GET',
          snackbarShowMessage,
          logout,
        });

        if (response) {
          const { profilePhoto, username, email, _id } = response;
          tempFollowings.push({
            profilePhoto,
            username,
            email,
            userId: _id,
          });
        }
      }
      setUserFollowingUsers([...tempFollowings]);
    }
  }

  useEffect(() => {
    getFollowersAndFollowingData();
  }, [userParamId, followings, followers]);

  return (
    <>
      <Tabs value={currentTab} textColor='secondary' indicatorColor='secondary'>
        <Tab
          onClick={() => {
            setCurrentTab('followers');
          }}
          sx={{ color: '#A303A0', textTransform: 'capitalize' }}
          value='followers'
          label='Followers'
        />
        <Tab
          onClick={() => {
            setCurrentTab('followings');
          }}
          sx={{ color: '#A303A0', textTransform: 'capitalize' }}
          value='followings'
          label='Following'
        />
        <Tab
          onClick={() => {
            setCurrentTab('posts');
          }}
          sx={{ color: '#A303A0', textTransform: 'capitalize' }}
          value='posts'
          label='Posts'
        />
      </Tabs>
      <ThinLine />
      <ThinLine />
      <TabPanel value={currentTab} index='posts'>
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <Post
                key={crypto.randomUUID()}
                postDataChangeHandler={postDataChangeHandler}
                postId={post._id}
                authorId={post.userId}
                authorName={post.authorName}
                postImage={post.postImage ?? ' '}
                description={post.description}
                avatarImage={post.authorImage}
                publishedDate={post.publishedDate || ' '}
                likes={post.likes}
                comments={post.comments}
              />
            );
          })
        ) : (
          <>
            <Typography variant='h5'>No posts yet.</Typography>
          </>
        )}
      </TabPanel>

      <TabPanel value={currentTab} index='followers'>
        {userFollowers.length === 0 ? (
          <Typography variant='h5'>You don't have any following users yet</Typography>
        ) : (
          userFollowers.map((friend) => {
            return (
              <Friend
                key={crypto.randomUUID()}
                profileImage={friend.profilePhoto}
                username={friend.username}
                email={friend.email}
                userId={friend.userId}
              />
            );
          })
        )}
      </TabPanel>

      <TabPanel value={currentTab} index='followings'>
        {userFollowingUsers.length === 0 ? (
          <Typography variant='h5'>You don't have any followers yet</Typography>
        ) : (
          userFollowingUsers.map((friend) => {
            return (
              <Friend
                key={crypto.randomUUID()}
                profileImage={friend.profilePhoto}
                username={friend.username}
                email={friend.email}
                userId={friend.userId}
              />
            );
          })
        )}
      </TabPanel>
    </>
  );
};

export default ProfileTabs;
