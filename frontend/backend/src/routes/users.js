import express from "express";
import {
  createUser,
  loginUser,
  getUserInfoById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../services/users.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({ username: user.username });
  } catch (err) {
    return res.status(400).json({
      error: "Failed to create the user. Does the username already exist?",
    });
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

router.get("/:id", async (req, res) => {
  try {
    const userInfo = await getUserInfoById(req.params.id);
    if (!userInfo) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(userInfo);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving user information." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "Failed to update user information." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(204).json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete user." });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving users." });
  }
});

export default router;
