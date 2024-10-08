import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../db/models/user.js";

export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  return await user.save();
}

export async function loginUser({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("invalid username!");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("invalid password");
  }

  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  };
}

export async function getUserInfoById(userId) {
  console.log(userId);
  try {
    const user = await User.findById(userId);
    if (!user) return null;
    return { username: user.username };
  } catch (err) {
    console.error(err);
    return null;
  }
}
