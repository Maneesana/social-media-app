const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    authorProfileImage: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      default: new Date(),
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
    },
    description: {
      type: String,
      max: 600,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
