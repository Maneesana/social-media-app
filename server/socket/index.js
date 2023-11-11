const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel.js");

let connectedUsers = [];
const allRooms = new Map();
const onlyFriendsRooms = new Map();
async function createRoomAndJoinRoom({ userId, io, socket }) {
  if (userId === null || userId === undefined) return;

  try {
    const user = await User.findOne({ _id: userId });
    // setting room  ==> allowed users
    allRooms.set(`${userId}Room`, [
      userId,
      ...user.followers,
      ...user.followingUsers,
    ]);
    let curentUserRooms = [];
    allRooms.forEach((friends, roomName) => {
      for (let i = 0; i < friends.length; i++) {
        if (userId === friends[i]) curentUserRooms.push(roomName);
      }
      console.log("roooomm dafds Friends", friends);
    });
    onlyFriendsRooms.set(userId, curentUserRooms);

    onlyFriendsRooms.get(userId).forEach((room) => {
      console.log("joining room", room, "by user", userId);
      socket.join(room);
    });
    console.log("allfriends room size after adding ", onlyFriendsRooms);
  } catch (error) {
    console.log("Something went wrong while retrieving a user", error);
  }
}

function getOnlineUsersEventHandler(userId) {
  return connectedUsers;
}

const onDisconnectHandler = (socket, io) => {
  console.log("disconnect user");
  const disconnectUserId = connectedUsers.find(
    (user) => user.connectionId === socket.id
  )?.userId;
  if (disconnectUserId === undefined) return () => {};
  console.log("disconnected user", disconnectUserId);
  connectedUsers = connectedUsers.filter(
    (user) => user.connectionId !== socket.id
  );
  onlyFriendsRooms.get(disconnectUserId).forEach((room) => {
    socket
      .to(room)
      .emit("getOnlineUsers", getOnlineUsersEventHandler(disconnectUserId));
  });

  io.sockets.emit(
    "getOnlineUsers",
    getOnlineUsersEventHandler(disconnectUserId)
  );
  socket.broadcast.emit(
    "getOnlineUsers",
    getOnlineUsersEventHandler(disconnectUserId)
  );
  console.log(
    "online users after disconnecting a user",
    getOnlineUsersEventHandler(disconnectUserId)
  );
};

const socketConnectionHandler = (io, socket) => {
  socket.on("registerUser", async ({ userId }) => {
    // create  a room and decide which room to join
    if (userId === null) return;
    await createRoomAndJoinRoom({ userId, io, socket });
    const user = await User.findOne({ _id: userId });

    const userIndex = connectedUsers.findIndex(
      (user) => user.userId === userId
    );

    if (userIndex >= 0) {
      connectedUsers[userIndex].connectionId = socket.id;
    } else if (userIndex === -1) {
      connectedUsers.push({
        userId,
        connectionId: socket.id,
        username: user.username,
        profilePhoto: user.profilePhoto,
      });
    }

    // socket.to().emit("getOnlineUsers", getOnlineUsersEventHandler(userId));
    onlyFriendsRooms.get(userId).forEach((room) => {
      console.log("emitting to room", room);
      socket
        .to(room)
        .emit("getOnlineUsers", getOnlineUsersEventHandler(userId));
    });
    // socket.emit("getOnlineUsers", getOnlineUsersEventHandler(userId));
    console.log("Connected user list", connectedUsers.length);
    console.log("Connected  users count :", io.engine.clientsCount);
  });

  socket.on("disconnect", onDisconnectHandler(socket, io));

  socket.on("sendMessage", ({ msg, receiverUserId, senderUserId }) => {
    console.log("user sends a msg", msg, receiverUserId);
    const msgReciever = connectedUsers.find(
      (user) => user.userId === receiverUserId
    );
    socket
      .to(msgReciever.connectionId)
      .emit("recieveMsg", { msgId: uuidv4(), msg, senderUserId });
    // socket.broadcast.emit("recieveMsg", msg);
  });
};

module.exports = socketConnectionHandler;
