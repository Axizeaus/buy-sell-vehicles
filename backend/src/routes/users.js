import express from "express";
import {
  createUser,
  loginUser,
  getUserInfoById,
  updateUser,
  deleteUser,
  getAllUsers,
  searchUserByUsername,
} from "../services/users.js";
import { requireAuth } from "../middleware/jwt.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({ username: user.username });
  } catch (err) {
    console.error("Signup error:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation failed. Please check your input.",
        details: err.errors,
      });
    } else if (err.code === 11000) {
      return res.status(400).json({
        error: "Failed to create the user. The username already exists.",
      });
    } else {
      return res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
        details: err.message,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({
      error: "Login failed. Did you enter the correct username/password?",
    });
  }
});

router.get("/search", async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res
      .status(400)
      .json({ error: "Username query parameter is required." });
  }

  try {
    const users = await searchUserByUsername(username);
    return res.status(200).json(users);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while searching for users." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userInfo = await getUserInfoById(req.params.id);
    if (!userInfo) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(userInfo);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving user information." });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Failed to update user information." });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(204).json({ msg: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete user." });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving users." });
  }
});

export default router;
