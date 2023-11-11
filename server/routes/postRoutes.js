const router = require("express").Router();

const tokenHandler = require("../middlewares/tokenHandler.js");
const {
  updateComment,
  createPost,
  deletePost,
  getPost,
  likePost,
  getAllPosts,
  updatePost,
} = require("../controllers/postController.js");

// create a post
router.post("/", tokenHandler, createPost);
// delete a post
router.delete("/delete/:postId", tokenHandler, deletePost);
//  update a post
router.put("/update", tokenHandler, updatePost);

// update a comment
router.put("/updateComment", tokenHandler, updateComment);

//  get a post
router.get("/:postId", tokenHandler, getPost);
//  like a post
router.put("/like", tokenHandler, likePost);
//  get all posts by userId
router.get("/all/:userId", tokenHandler, getAllPosts);

module.exports = router;
