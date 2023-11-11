const router = require("express").Router();
const mongoose = require("mongoose");

const Message = require("../models/Message.js");

//  get message
router.get("/:conversationId", async (req, res) => {
  try {
    const allMessage = await Message.find({
      conversationId: [req.params.conversationId],
    });
    res.status(200).json(allMessage);
  } catch (error) {
    res.status(500).json(err);
  }
});
//  add message
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const saveMessage = await newMessage.save();
    res.status(200).json(saveMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
