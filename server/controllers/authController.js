const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const { use } = require("../routes/authRoutes.js");

const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Fields are missing. All fields are mandatory");
  }

  const availableUser = await User.findOne({ email });
  if (availableUser) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        message: "User successfully created.",
        data: { _id: user.id, email: user.email, username: email.username },
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ message: "All fields are mandatory" });
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          userId: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "360m" }
    );
    res.status(200).json({ accessToken });
    // res.status(200).json({ message: "Login successfully" });
  } else {
    res.status(401).json({ message: "Email or password is invalid" });
    throw new Error("email or password is invalid");
  }
});

const getCurrentLoginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.user;
    console.log("req email", req.user);
    const currentUser = await User.findOne({ email });
    // console.log("Current user", currentUser);
    res.status(200).json({
      user: {
        ...req.user,
        profilePhoto: currentUser._doc.profilePhoto,
        followers: currentUser._doc.followers,
        followingUsers: currentUser._doc.followingUsers,
      },
    });
    // res.status(200).json({ user: req.user });
  } catch (error) {
    console.log("error", error.message);
    res.status(401).json({ message: error.message });
  }
  // res.json({user})
});

module.exports = { registerUser, loginUser, getCurrentLoginUser };
