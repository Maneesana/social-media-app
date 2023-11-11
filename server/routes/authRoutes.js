const express = require("express");
const router = express.Router();
const tokenHandler = require("../middlewares/tokenHandler.js");

const {
  loginUser,
  getCurrentLoginUser,
  registerUser,
} = require("../controllers/authController.js");

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/current", tokenHandler, getCurrentLoginUser);

module.exports = router;
