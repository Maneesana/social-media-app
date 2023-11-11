const User = require("../models/userModel.js");
const router = require("express").Router();
const tokenHandler = require("../middlewares/tokenHandler.js");
const {
  updateUser,
  deleteUser,
  getUser,
  followAUser,
  unfollowAUser,
} = require("../controllers/userController.js");
// update user
router.put("/:id", tokenHandler, updateUser);
// delete user
router.delete("/:id", tokenHandler, deleteUser);
router.get("/:id", tokenHandler, getUser);
router.put("/:id/follow", tokenHandler, followAUser);
router.put("/:id/unfollow", tokenHandler, unfollowAUser);

// get a user
//  follow a user
// unfollow a user

module.exports = router;
