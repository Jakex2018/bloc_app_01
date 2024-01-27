import express from "express";
import {
  commentPost,
  createPost,
  deleteComment,
  deletePost,
  getComments,
  getFollowers,
  getPopularPost,
  getPost,
  getPostContent,
  getPosts,
  stats,
  updatePost,
} from "../controllers/postController.js";
import userAuth from "../middlewares/authMiddleware.js";
const postRoutes = express.Router();

//admin routes
postRoutes.post("/admin-analytics", userAuth, stats);
postRoutes.post("/admin-followers", userAuth, getFollowers);
postRoutes.post("/admin-content", userAuth, getPostContent);
postRoutes.post("/create-post", userAuth, createPost);

//like and comment on post
postRoutes.post("/comment/:id", userAuth, commentPost);

// update post
postRoutes.patch("/update/:id", userAuth, updatePost);

//get posts router
postRoutes.get("/", getPosts);
postRoutes.get("/popular", userAuth, getPopularPost);
postRoutes.get("/:postId", userAuth, getPost);
postRoutes.get("/comments/:postId", userAuth, getComments);

//delete post router
postRoutes.delete("/:id", userAuth, deletePost);
postRoutes.delete("/comment/:id/:postId", userAuth, deleteComment);

export default postRoutes;
