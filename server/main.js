const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const dotEnvt = require("dotenv").config();
const connectDb = require("./config/connectDb.js");

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketConnectionHandler = require("./socket/index.js");
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_ENDPOINT || "http://localhost:5173",
  },
});

connectDb();
app.use(cors());
app.use(morgan("combined"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
//  parser application/json
app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.json());

app.use("/api/conversation", require("./routes/conversations.js"));
app.use("/api/messages", require("./routes/messages.js"));
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/api/posts", require("./routes/postRoutes.js"));
app.use("/api/newsfeed", require("./routes/newsFeedRoutes.js"));
app.use("/api/friends", require("./routes/friendsRoutes.js"));

io.on("connection", (socket) => socketConnectionHandler(io, socket));
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("server is listening at port ", port);
});
