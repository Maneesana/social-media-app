/* eslint-disable quotes */
import { useEffect, useContext, useState, useRef } from 'react';
import { Container, Box, TextField, Button, InputBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../../../context';

import Message from './@components/Message';
import ChatUserBadge from './@components/ChatUserBadge';
import { socket } from '../../../config/socket';
import axiosErrorHandler from '../../../config/axiosErrorHandler';
import { USER_ROUTES_COMMON_URL } from '../../../services';
import { SnackbarContext } from '../../../context/SnackbarContext';
import { TFriend } from '../userProfile/@components/ProfileTabs/ProfileTabs';
import Friend from '../../../components/friend/@components/Friend';

const BoxWrapper = styled(Box)(() => ({
  padding: '12px',
  height: '100%',
}));
interface IOnlineUser {
  connectionId: string;
  userId: string;
  username: string;
  profilePhoto: string;
}
interface IUserMessage {
  isMe: boolean;
  message: string;
  msgId: string;
}

const index = () => {
  // const [converstaions, setConversations] = useState([]);
  const { userProfile, logout } = useContext(AuthContext);
  const { snackbarShowMessage } = useContext(SnackbarContext);
  const [onlineUsers, setOnlineUsers] = useState<IOnlineUser[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [currentChatUser, setCurrentChatUser] = useState<IOnlineUser | null>(null);
  const scrollRef = useRef<HTMLElement | null>(null);
  const [userConversations, setUserConversations] = useState<IUserMessage[]>([] as IUserMessage[]);
  const [userChatFriends, setUserChatFriends] = useState<TFriend[]>([] as TFriend[]);

  async function getUserChatFriends() {
    const tempFollowers = [];
    if (userProfile.followers.length === 0) {
      setUserChatFriends([]);
    } else {
      for (let i = 0; i < userProfile.followers.length; i++) {
        const response = await axiosErrorHandler({
          endpoint: USER_ROUTES_COMMON_URL + userProfile.followers[i],
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
      setUserChatFriends([...tempFollowers]);
    }
  }

  function connectMessenger() {
    if (Object.keys(userProfile).length === 0) return;
    socket.connect();
  }
  function disconnectMessenger() {}

  function resetUserMessage() {
    setUserMessage('');
  }
  function currentChatHandler(user: IOnlineUser) {
    setCurrentChatUser(user);
  }
  function sendMessage(receiverUserId: string | null) {
    if (receiverUserId !== null) {
      socket.emit('sendMessage', {
        receiverUserId,
        msg: userMessage,
        senderUserId: userProfile.userId,
      });
      setUserConversations((prev) => {
        return [...prev, { isMe: true, message: userMessage, msgId: crypto.randomUUID() }];
      });
      resetUserMessage();
    }
  }

  const recieveMsgEventHandler = (msgData: { msg: string; msgId: string }) => {
    console.log('Recieved msg', msgData);
    console.log('all user conversations', userConversations);
    setUserConversations((prev) => {
      return prev.findIndex((conv) => conv.msgId === msgData.msgId) === -1
        ? [...prev, { isMe: false, message: msgData.msg, msgId: msgData.msgId }]
        : prev;
    });
  };
  const connectEventHandler = () => {
    socket.emit('registerUser', {
      userId: userProfile?.userId || null,
    });
  };

  const getOnlineUsersEventHandler = (listOfOnlineUsers: IOnlineUser[]) => {
    const onlineUsers = listOfOnlineUsers.filter(
      (user: IOnlineUser) => user.userId !== userProfile.userId,
    );
    console.log('list of all online users excluding current user', onlineUsers);
    console.log('user profile', userProfile);
    setOnlineUsers(onlineUsers);
  };
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [userConversations]);
  useEffect(() => {
    getUserChatFriends();
  }, [userProfile]);

  useEffect(() => {
    console.log('useEffect messenger');

    connectMessenger();
    socket.on('connect', connectEventHandler);
    socket.on('disconnect', disconnectMessenger);
    socket.on('getOnlineUsers', getOnlineUsersEventHandler);
    socket.on('recieveMsg', recieveMsgEventHandler);

    return () => {
      socket.disconnect();
      socket.off('connect', connectMessenger);
      socket.off('disconnect', disconnectMessenger);
      socket.off('getOnlineUsers', getOnlineUsersEventHandler);
      socket.off('recieveMsg', recieveMsgEventHandler);
    };
  }, [userProfile]);

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          height: '100vh',
          // height: `calc('100vh-70px')`,
        }}
        maxWidth={false}
      >
        <Box sx={{ flex: 3.5 }}>
          <BoxWrapper>
            <Box sx={{ width: '100%' }}>
              <InputBase
                placeholder='Search Search Messages'
                sx={{
                  background: '#edf2f2',
                  borderRadius: '12px',
                  width: '100%',
                  padding: '7px',
                  paddingLeft: '20px',
                }}
              />
              {userChatFriends.length !== 0 &&
                userChatFriends.map((friend) => {
                  return (
                    <Friend
                      isChatMode
                      chatHandler={() => {}}
                      key={crypto.randomUUID()}
                      profileImage={friend.profilePhoto}
                      username={friend.username}
                      email={friend.email}
                      userId={friend.userId}
                    />
                  );
                })}
            </Box>
          </BoxWrapper>
        </Box>

        <Box
          sx={{
            flex: 5.5,
          }}
        >
          <Box
            sx={{
              height: '75%',
              overflowY: 'scroll',
              '::-webkit-scrollbar': {
                width: '8px',
              },
              '::-webkit-scrollbar-track': {
                background: '#ddeded',
              },
              '::-webkit-scrollbar-thumb': {
                background: '#8d9494',
                borderRadius: '5px',
              },
            }}
          >
            <ChatUserBadge
              online
              avatarPhoto={currentChatUser?.profilePhoto || ''}
              chatUserName={currentChatUser?.username ?? 'N/A'}
            />
            <BoxWrapper>
              {userConversations.length > 0 &&
                userConversations.map((conv) => {
                  return (
                    <Box ref={scrollRef} key={crypto.randomUUID()}>
                      <Message me={conv.isMe} userMsg={conv.message} />
                    </Box>
                  );
                })}

              {/* <Message /> */}
            </BoxWrapper>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px', marginTop: '40px', alignItems: 'center' }}>
            <TextField
              sx={{ width: '100%', height: '120px' }}
              id='outlined-multiline-static'
              label='write something here'
              rows={3}
              value={userMessage}
              multiline
              onChange={(e) => setUserMessage(e.target.value)}
            ></TextField>
            <Button
              onClick={() => sendMessage(currentChatUser?.userId || null)}
              variant='contained'
            >
              {' '}
              Send
            </Button>
          </Box>
        </Box>
        <Box sx={{ flex: 3 }}>
          <BoxWrapper>
            {onlineUsers.length > 0 ? (
              onlineUsers.map((user) => {
                return (
                  <ChatUserBadge
                    key={crypto.randomUUID()}
                    avatarPhoto={user.profilePhoto}
                    onClick={() => currentChatHandler(user)}
                    chatUserName={user.username}
                    online
                  />
                );
              })
            ) : (
              <Typography>No online users</Typography>
            )}
          </BoxWrapper>
        </Box>
      </Container>
    </>
  );
};

export default index;
