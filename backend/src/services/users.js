import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/models/user.js";
import { Post } from "../db/models/post.js";

export async function createUser(props) {
  try {
    const { username, password, location, contactInfo, miscellaneous } = props;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      ...(location && { location }),
      ...(contactInfo && { contactInfo }),
      ...(miscellaneous && { miscellaneous }),
    });

    return await user.save();
  } catch (err) {
    if (err.code === 11000) {
      if (err.keyPattern.username) {
        throw new Error("Username already exists");
      } else if (err.keyPattern["contactInfo.email"]) {
        throw new Error("Email already exists");
      }
    }

    console.error("Error creating user:", err);
    throw new Error("User creation failed");
  }
}

export async function loginUser({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid username!");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      location: user.location,
      contactInfo: user.contactInfo,
      miscellaneous: user.miscellaneous,
    },
  };
}

export async function getUserInfoById(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) return null;
    return {
      username: user.username,
      userId: user._id.toString(),
      location: user.location || null,
      contactInfo: user.contactInfo || null,
      miscellaneous: user.miscellaneous || null,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getAllUsers() {
  try {
    const users = await User.find();
    return users.map((user) => ({
      id: user._id.toString(),
      username: user.username,
      location: user.location || null,
      contactInfo: user.contactInfo || null,
      miscellaneous: user.miscellaneous || null,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function updateUser(userId, props) {
  const { username, password, location, contactInfo, miscellaneous } = props;
  const updates = {};

  if (username) updates.username = username;
  if (password) updates.password = await bcrypt.hash(password, 10);
  if (location) updates.location = location;
  if (contactInfo) updates.contactInfo = contactInfo;
  if (miscellaneous) updates.miscellaneous = miscellaneous;

  try {
    if (username) {
      const existingUser = await User.findOne({
        username,
        _id: { $ne: userId },
      });
      if (existingUser) {
        throw new Error("Username already exists");
      }
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) return null;
    return {
      id: user._id.toString(),
      username: user.username,
      location: user.location || null,
      contactInfo: user.contactInfo || null,
      miscellaneous: user.miscellaneous || null,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteUser(userId) {
  try {
    const posts = await Post.find({ seller: userId });
    if (posts.length > 0) {
      await Post.deleteMany({ seller: userId });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      console.warn(`User with ID ${userId} not found.`);
      return null; // User not found
    }

    return {
      id: user._id.toString(),
      username: user.username,
      location: user.location || null,
      contactInfo: user.contactInfo || null,
      miscellaneous: user.miscellaneous || null,
    };
  } catch (err) {
    console.error("Error deleting user:", err);
    return null;
  }
}

export async function searchUserByUsername(username) {
  try {
    const users = await User.find({
      username: { $regex: username, $options: "i" },
    });

    return users.map((user) => ({
      id: user._id.toString(),
      username: user.username,
      location: user.location || null,
      contactInfo: user.contactInfo || null,
      miscellaneous: user.miscellaneous || null,
    }));
  } catch (err) {
    console.error("Error searching for users by username:", err);
    return [];
  }
}
