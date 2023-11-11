const Post = require("../models/Post.js");

const updateComment = async (req, res) => {
  if (
    !Object.keys(req.body).includes("postId") ||
    !Object.keys(req.body).includes("comment")
  ) {
    res.status(400).json({ message: "Invalid payload" });
    throw new Error("Invalid request body");
  } else {
    const userId = req.body.userId;

    try {
      const user = await Post.findById({ _id: req.body.postId });
      if (user) {
        await user.updateOne({
          $push: { comments: req.body.comment },
        });
      } else {
        res.status(400).json({ message: "Post  not found" });
      }
      res
        .status(200)
        .json({ message: "Your comment has been added successfully" });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
};

const createPost = async (req, res) => {
  if (
    !req.body.userId ||
    !req.body.description ||
    !req.body.postImage ||
    !req.body.authorImage ||
    !req.body.authorName
  ) {
    res.status(400).json({ message: "All fields are mandatory!!" });
    throw Error("Post fields cannot be missing!!");
  } else {
    const newPost = new Post({
      userId: req.body.userId,
      authorName: req.body.authorName,
      authorImage: req.body.authorImage,
      description: req.body.description,
      likes: req.body.likes,
      comments: req.body.comments,
      postImage: req.body.postImage,
      publishedDate: new Date(),
    });
    try {
      const createdPost = await newPost.save();
      res.status(200).json({
        message: "A post is created successfully.",
        savedPost: createdPost,
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Something went wrong while creating the post" });
    }
  }
};

const getPost = async (req, res) => {
  if (!req.params.postId) {
    res.status(400).json({
      message: "postId is missing",
    });
    throw new Error("postid is missing");
  } else {
    const postId = req.params.postId;
    try {
      const post = await Post.findById(postId);
      res.status(200).json({ post });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
const likePost = async (req, res) => {
  if (!req.body.postId) {
    res.status(400).json({ message: "Payload fields missing" });
  }
  try {
    const post = await Post.findById({ _id: req.body.postId });

    await post.updateOne({ $set: { likes: post.likes + 1 } });
    res.status(200).json({ message: "You liked the post successfully" });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePost = async (req, res) => {
  if (!req.body.postId || !req.body.description || !req.body.postImage) {
    res.status(400).json({ message: "Invalid payload" });
    throw new Error("Invalid request body");
  } else {
    const postId = req.body.postId;

    try {
      await Post.findByIdAndUpdate(req.body.postId, {
        $set: {
          postImage: req.body.postImage,
          description: req.body.description,
          publishedDate: new Date().toDateString(),
        },
      });
      res.status(200).json({ message: "Post updated successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const getAllPosts = async (req, res) => {
  if (!req.params.userId) {
    res.status(400).json({
      message: "userid is missing",
    });
    throw new Error("userid is missing");
  } else {
    const userId = req.params.userId;
    try {
      const posts = await Post.find({ userId });
      res.status(200).json({ posts });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

const deletePost = async (req, res) => {
  if (!req.params.postId) {
    res.status(400).json({ message: "Params missing" });
    console.error("Params missing");
  }
  try {
    await Post.findOneAndDelete({ _id: req.params.postId });
    res.status(200).json({ message: "Post has been deleted successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong while performing operations on database",
    });
    console.error(error);
  }
};

module.exports = {
  createPost,
  updateComment,
  getPost,
  deletePost,
  updatePost,
  likePost,
  getAllPosts,
};
