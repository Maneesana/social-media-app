const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

//  update user
const updateUser = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (err) {
        console.log("Updating password error", err);
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({ message: "Account updated successfully" });
    } catch (error) {
      return res.status(400).json(error);
    }
  } else {
    return res.status(403).json(" You can only update your account details !");
  }
});

//  delete a user
const deleteUser = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Your account has been deleted successfully.");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(400).json("You can only delete your account");
  }
});
const Post = require("../models/Post.js");
//  get a user
const getUser = asyncHandler(async (req, res) => {
  if (req.params.id) {
    try {
      const userData = await User.findOne({ _id: req.params.id });
      const { password, updatedAt, ...others } = userData._doc;
      res.status(200).json(others);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
});

// follow a user

const followAUser = async (req, res) => {
  if (!req.params.id || !req.body.userId) {
    return res.status(400).json("Payload is missing!!");
  }

  if (req.params.id !== req.body.userId) {
    try {
      const toFollowUser = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!toFollowUser.followers.includes(req.body.userId)) {
        await toFollowUser.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({
          $push: { followingUsers: req.params.id },
        });
        return res
          .status(200)
          .json({ message: "You have successfully followed" });
      } else {
        res
          .status(400)
          .json({ message: "You have already followed this user" });
      }
    } catch (error) {}
  } else {
    return res.status(400).json("You cannot follow your self.");
  }
};

// unfollow a user
const unfollowAUser = async (req, res) => {
  if (!req.params.id || !req.body.userId) {
    return res.status(400).json("Payload is missing!!");
  }
  if (req.params.id !== req.body.userId) {
    try {
      const toUnfollowUser = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (toUnfollowUser.followers.includes(req.body.userId)) {
        await toUnfollowUser.updateOne({
          $pull: { followers: { $eq: req.body.userId } },
        });
        await currentUser.updateOne({
          $pull: { followingUsers: { $eq: req.params.id } },
        });
        return res
          .status(200)
          .json({ message: "You have successfully unfollowed the user" });
      } else {
        res.status(403).json({
          message:
            "You are not a follower of the user. You need to follow me first.",
        });
      }
    } catch (error) {
      console.log("error while unfollowing a user", error.message);
    }
  } else {
    return res.status(400).json("You cannot unfollow yourself.");
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followAUser,
  unfollowAUser,
};
