import express from "express";

import { createUser, loginUser, getUserInfoById } from "../services/users.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({ username: user.username });
  } catch (err) {
    return res.status(400).json({
      error: "failed to create the user, does the username already exist?",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body);
    return res.status(200).send({ token });
  } catch (err) {
    return res.status(400).send({
      error: "login failed, did you enter the correct username/password?",
    });
  }
});

router.get("/:id", async (req, res) => {
  console.log("req params: " + req.params.id);
  const userInfo = await getUserInfoById(req.params.id);
  return res.status(200).send(userInfo);
});

export default router;
