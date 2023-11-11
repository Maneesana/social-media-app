const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const tokenHandler = asyncHandler(async (req, res, next) => {
  console.log("token handler");
  let token;
  authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "You are not authorized" });
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(400).json({ message: "Authorization header missing" });
  }
});
module.exports = tokenHandler;
