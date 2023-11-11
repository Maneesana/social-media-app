const User = require("../models/userModel.js");
const router = require("express").Router();
const tokenHandler = require("../middlewares/tokenHandler.js");

router.get("/peopleYouMightKnow/:userId", tokenHandler, async (req, res) => {
  console.log("People you might know ", req.params);
  if (!req.params.userId) {
    res.status(400).json({ message: "User id missing" });
  }
  try {
    const peopleYouMightKnow = [];
    const users = await User.find({});
    const randSize = Math.floor(Math.random() * users.length);
    for (let i = 0; i < randSize; i++) {
      const { _id, username, email, profilePhoto } = users[i];
      console.log("user id", _id);
      if (JSON.stringify(req.params.userId) !== JSON.stringify(_id)) {
        peopleYouMightKnow.push({
          userId: _id,
          profilePhoto,
          username,
          email,
        });
      }
    }
    res.status(200).json({ users: peopleYouMightKnow });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
