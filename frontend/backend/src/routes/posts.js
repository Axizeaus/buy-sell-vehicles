import express from "express";
import {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
  getPostByUser,
} from "../services/post.js";
import { requireAuth } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { sortBy, sortOrder, priceRange, vehicleType, location } = req.query;

    const posts = await getAllPosts({
      sortBy,
      sortOrder,
      priceRange,
      vehicleType,
      location,
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const newPost = await createPost(req.auth.sub, req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  try {
    const updatedPost = await updatePost(req.auth.sub, req.params.id, req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deletedPost = await deletePost(req.auth.sub, req.params.id);
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const sellerId = req.params.userId;
    const posts = await getPostByUser(sellerId);
    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "No posts found for this user" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
